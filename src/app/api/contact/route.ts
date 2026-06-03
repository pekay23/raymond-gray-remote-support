import { NextResponse } from "next/server";

// Server-to-server proxy for support-service contact submissions.
//
// The browser POSTs here (same-origin, so no CORS), and this handler relays the
// inquiry to the Raymond Gray platform's dedicated support-services endpoint.
// Going server-to-server is deliberate: the platform locks that endpoint's CORS
// to the production subdomain, so a *browser* on localhost would be blocked —
// but this proxy is exempt, which is why submissions work identically from
// localhost and from the live site.
//
// Auth model: CORS origin lock + per-IP rate limiting (NOT a shared API key).
// The platform endpoint owns all validation, honeypot, timing checks, storage,
// and admin notifications. This proxy is a thin shaping/relay layer.
// (See SUBDOMAIN_INTAKE_STANDARD.md.)
const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PARENT_API_URL || "https://www.raymond-gray.org";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the real visitor's IP so the platform's per-IP rate limit applies
    // to the customer, not to this serverless function's shared egress IP.
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    // Map the contact form fields to the platform's supportServiceCreateSchema.
    const payload = {
      fullName: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      company: body.company || "",
      serviceType: "Contact Inquiry",
      message: body.message || "",
      honeypot: body.honeypot,
      formLoadedAt: body.formLoadedAt,
    };

    const res = await fetch(`${PLATFORM_URL}/api/support-services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "x-forwarded-for": clientIp } : {}),
      },
      body: JSON.stringify(payload),
    });

    // Guard against a non-JSON upstream (e.g. a 404 HTML page if the URL/path is
    // misconfigured) so the client degrades gracefully instead of throwing.
    const text = await res.text();
    let data: { success?: boolean; ref?: string; error?: string } | null;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "[Contact Proxy] Non-JSON upstream response:",
        res.status,
        text.slice(0, 250)
      );
      return NextResponse.json(
        { error: "Support service is unavailable. Please email us directly." },
        { status: 502 }
      );
    }

    if (res.ok && data?.success) {
      return NextResponse.json({ success: true, ref: data.ref });
    }

    console.error("[Contact Proxy] Upstream rejected:", res.status, data);
    return NextResponse.json(
      { error: data?.error || "Failed to submit inquiry." },
      { status: res.status === 429 ? 429 : 400 }
    );
  } catch (error) {
    console.error("[Contact Proxy]", error);

    // Detect connection-refused (platform not running) and return a clear 503
    const isConnRefused =
      error instanceof TypeError &&
      (error as TypeError & { cause?: { code?: string } }).cause?.code === "ECONNREFUSED";

    if (isConnRefused) {
      return NextResponse.json(
        {
          error:
            "The support platform is currently unreachable. " +
            "If running locally, ensure raymond-gray-platform is started on port 3000.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
