// End-to-end test for the contact proxy chain.
//
//   browser → /api/contact (this app) → parent /api/webhooks/forms
//
// Usage:
//   bun scripts/test-contact.mjs                 # default: local app on :3001
//   bun scripts/test-contact.mjs http://localhost:3001
//   bun scripts/test-contact.mjs https://remotesupport.raymond-gray.org
//
// A success looks like: { success: true, ref: "REQ-#####" }

const base = (process.argv[2] || "http://localhost:3001").replace(/\/$/, "");
const url = `${base}/api/contact`;

const payload = {
  name: "Audit Test",
  email: "audit-test@example.com",
  company: "Council QA",
  message: `Automated contact-proxy test @ ${new Date().toISOString()}`,
  honeypot: "", // empty = human
  formLoadedAt: Date.now() - 5000, // 5s ago = passes the timing gate
};

console.log(`→ POST ${url}`);
try {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log(`← ${res.status} ${res.statusText}`);
  console.log(text);
  process.exit(res.ok ? 0 : 1);
} catch (err) {
  console.error("Request failed:", err.message);
  console.error("Is the dev server running? (bun run dev → :3001)");
  process.exit(1);
}
