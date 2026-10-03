# Raymond Gray Remote Support

A single-page Next.js subdomain site for Raymond Gray Remote Support, hosted at `remotesupport.raymond-gray.org`.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12, GSAP 3 |
| UI primitives | Radix UI (Accordion, Dialog, Tooltip) |
| Icons | Lucide React |
| Package manager | Bun |
| Language | TypeScript |

## Structure

```
src/
  app/
    page.tsx                  # Composes the one-page layout from section components
    layout.tsx                # Root layout, fonts, global metadata (SEO, OG, Twitter cards)
    globals.css               # Design tokens, Tailwind theme, global styles
    api/contact/route.ts      # Server-side proxy — forwards form submissions to the platform
    company-profile.pdf/      # Route that serves the company profile PDF
  components/
    site/
      Header.tsx              # Sticky navigation header
      Hero.tsx                # Hero section with parallax background and animated headline
      ServicesSection.tsx     # Core services grid (Admin, Customer Service, Operations, IT Helpdesk)
      TiersSection.tsx        # IT helpdesk tier breakdown (L1, L2 Standard, L2 Advanced)
      DeliverySection.tsx     # Delivery model, engagement options, assurance controls
      EcosystemSection.tsx    # Experience profile cards + animated client logo grid
      FeedbackSection.tsx     # Client testimonials / feedback quotes
      ContactSection.tsx      # Contact form with spam protection (honeypot + timing check)
      Footer.tsx              # Site footer
      BackToTop.tsx           # Floating back-to-top button
    ui/
      LogoCycleGrid.tsx       # Animated cycling logo grid used in EcosystemSection
  lib/
    profile-content.ts        # All editable page copy and data in one place
    utils.ts                  # Utility helpers (cn, etc.)
scripts/
  test-contact.mjs            # End-to-end contact form submission test
  update-profile.mjs          # Helper to update profile copy
  download-client-logos.mjs   # Fetches client logos from the web
  fetch-missing-logos.mjs     # Fills in any logos not yet downloaded
  fetch-updated-logos.mjs     # Re-fetches logos that may have changed
  generate-html.js            # Generates a static HTML snapshot for reference
docs/
  LLM_COUNCIL_FRAMEWORK.md    # AI review framework documentation
  PORTFOLIO_SUMMARY.md        # Portfolio project summary
```

## Local Development

Install dependencies, then run the app:

```bash
bun install
bun run dev       # → http://localhost:3001
```

> **Note:** This app runs on port **3001**. The parent platform (`raymond-gray-platform`) runs on port **3000** so they never collide locally.

## Content

All page copy and representative client data live in `src/lib/profile-content.ts`. Editable exports include:

- `heroCopy` — hero headline, lede, and sub-lede
- `coreServicesAdmin` / `coreServicesIT` — services cards and bullet points
- `itTiers` — L1/L2 tier definitions
- `deliveryModel` — engagement options and assurance items
- `bestFitClients` / `assuranceControls` — delivery section lists
- `experienceProfile` — named client experience cards
- `representativeList` — client logos shown in the ecosystem grid
- `feedback` — client testimonial quotes

## Contact Form Architecture

The form submits **same-origin** to `/api/contact`. That route is a server-side proxy that forwards to the parent platform's support-services endpoint (`${NEXT_PUBLIC_PARENT_API_URL}/api/support-services`).

```
browser ──same-origin──▶ /api/contact ──server-side──▶ platform /api/support-services
```

**Why server-to-server?** The platform's CORS policy locks that endpoint to the production subdomain, so a browser on localhost would be blocked. The server-side proxy is exempt, which means submissions work identically from localhost and from the live site.

**Spam protection** is a two-layer approach — both handled by the platform:
1. **Honeypot field** — a hidden form field bots fill in; the platform rejects submissions where it is non-empty.
2. **Timing check** — `formLoadedAt` (timestamp set when the form mounts) is forwarded so the platform can reject submissions completed suspiciously fast.

**Rate limiting** is owned by the platform (per-IP). The proxy forwards the visitor's real IP via `x-forwarded-for` so limits apply to the customer, not the shared serverless egress IP.

## Testing the Contact Form

**A. Local app → local parent**
```bash
# terminal 1: in raymond-gray-platform
bun run dev              # → http://localhost:3000

# terminal 2: in this repo
# .env.local NEXT_PUBLIC_PARENT_API_URL=http://localhost:3000
bun run dev              # → http://localhost:3001
bun scripts/test-contact.mjs http://localhost:3001
```

**B. Local app → live parent**

In `.env.local`, set `NEXT_PUBLIC_PARENT_API_URL=https://www.raymond-gray.org`, then:
```bash
bun run dev
bun scripts/test-contact.mjs http://localhost:3001
```

**C. Live site (end-to-end production)**
```bash
bun scripts/test-contact.mjs https://remotesupport.raymond-gray.org
```

A successful submission returns `{ "success": true, "ref": "REQ-#####" }`.

## Environment Variables

Copy `.env.example` to `.env.local` for local development. See `.env.example` for full documentation.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL of this site (used to set `metadataBase`) |
| `NEXT_PUBLIC_PARENT_API_URL` | Yes | Base URL of the raymond-gray-platform backend |

> Rate limiting and spam protection are handled entirely by the platform. No Upstash credentials or webhook secrets are required in this repo.

## Fonts

The site uses a layered font stack loaded from `public/fonts/`:

- **Gotham** (local) — display/headings (`font-display`)
- **Poppins** (local + Google) — body copy (`font-sans`)
- **Avenir Next LT Pro** (local) — accent copy
- **Montserrat** / **Nunito** (Google) — supplementary

## Scripts

| Script | Purpose |
|---|---|
| `scripts/test-contact.mjs` | End-to-end contact form test against any environment |
| `scripts/update-profile.mjs` | Applies bulk updates to profile copy |
| `scripts/download-client-logos.mjs` | Downloads client logos from the web |
| `scripts/fetch-missing-logos.mjs` | Fetches any logos missing from `public/logos/` |
| `scripts/fetch-updated-logos.mjs` | Re-fetches logos that may have changed |
| `scripts/generate-html.js` | Generates a static HTML reference snapshot |
