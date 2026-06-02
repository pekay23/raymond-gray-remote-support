import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // Rate limit check
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const parentUrl = process.env.NEXT_PUBLIC_PARENT_API_URL;
    if (!parentUrl) {
      console.error("[Contact Proxy] NEXT_PUBLIC_PARENT_API_URL is not set");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    const res = await fetch(`${parentUrl}/api/webhooks/forms`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": process.env.WEBHOOK_SECRET || ""
      },
      body: JSON.stringify({
        sourceDomain: "remote-support.raymondgray.com",
        formType: "Contact Inquiry",
        customerName: body.name || "Anonymous",
        customerEmail: body.email || null,
        customerPhone: body.phone || null,
        payload: {
          company: body.company || null,
          message: body.message || null,
        }
      }),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[Contact Proxy]", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
