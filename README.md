# Raymond Gray Remote Support

A one-page Next.js subdomain site for Raymond Gray Remote Support.

## Structure

- `src/app/page.tsx` composes the page from section components.
- `src/components/site/*` contains the page sections and animation components.
- `src/lib/profile-content.ts` keeps editable page copy in one place.

## Local Development

Install dependencies, then run the app:

```bash
bun install
bun run dev
```

Then open `http://localhost:3000`.

## Content

The site is built as a public-facing professional website for hosted client review. Website copy and representative client data live in `src/lib/profile-content.ts`.

## Contact form architecture

The form posts **same-origin** to `/api/contact`. That route is a server-side
proxy that forwards to the parent platform's webhook
(`${NEXT_PUBLIC_PARENT_API_URL}/api/webhooks/forms`), authenticated with
`WEBHOOK_SECRET`. The browser never makes a cross-origin request, so there are
no CORS concerns and the shared secret stays server-side.

```
browser ──same-origin──▶ /api/contact ──server-side──▶ parent /api/webhooks/forms
```

## Testing the contact submission (won't fail in any environment)

This app runs on **:3001**; the parent platform (`raymond-gray-platform`) runs
on **:3000**, so they never collide locally.

**A. Local app → local parent**
```bash
# terminal 1: in raymond-gray-platform
bun run dev                 # → http://localhost:3000
# terminal 2: in this repo (.env.local PARENT = http://localhost:3000)
bun run dev                 # → http://localhost:3001
bun scripts/test-contact.mjs http://localhost:3001
```

**B. Local app → LIVE parent** — in `.env.local`, switch
`NEXT_PUBLIC_PARENT_API_URL` to `https://www.raymond-gray.org`, then:
```bash
bun run dev
bun scripts/test-contact.mjs http://localhost:3001
```

**C. Live site (end-to-end production)**
```bash
bun scripts/test-contact.mjs https://remotesupport.raymond-gray.org
```

A success returns `{ "success": true, "ref": "REQ-#####" }`. The proxy fails
*open* on rate limiting when Upstash isn't configured, so local tests work even
without Redis creds. In production, set `UPSTASH_REDIS_REST_URL`,
`UPSTASH_REDIS_REST_TOKEN`, and `WEBHOOK_SECRET` in the hosting environment.
