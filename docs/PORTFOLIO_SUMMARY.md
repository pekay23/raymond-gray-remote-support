# Raymond Gray Remote Support — Portfolio Summary

Drop-in copy for your portfolio site. Pick the version that matches the framing you want, and the answered template at the bottom.

---

## Short pitch (2–3 sentences, hero card)

Raymond Gray Remote Support is a polished, single-page marketing website I designed and built for a Ghana-based remote support services firm serving SME clients across the UK, US, and internationally. The site communicates the company's full offering — back-office administration, customer service operations, and a structured IT helpdesk tier programme — and feeds qualified leads directly into the Raymond Gray platform via a secure, server-side contact proxy. Built on Next.js 16 + React 19 with Framer Motion and GSAP animations, self-hosted custom fonts, and an animated client ecosystem section powered by a 40+ company logo grid with a looping video background.

---

## Long description (case study body, ~250 words)

**Raymond Gray needed a credible, client-facing web presence** that matched the quality of their operational delivery. The company provides structured remote support to manufacturing and engineering SMEs — inbox management, VoIP call handling, order tracking, IT helpdesk coverage — but had no dedicated site to communicate that offer to prospective clients or direct them into the inquiry pipeline.

I built **Raymond Gray Remote Support** as a single-page Next.js 16 (App Router) + React 19 + TypeScript site, deployed as a subdomain (`remotesupport.raymond-gray.org`) of the wider Raymond Gray platform. The site is animated throughout — Framer Motion drives staggered entrance animations on every section (spring physics, blur-to-clear effects, parallax hero), while GSAP ScrollTrigger powers the client experience cards. A custom `LogoCycleGrid` component displays 40+ representative client logos over a lazy-loaded looping video background.

The non-obvious work is in the **integration layer**: the contact form submits same-origin to `/api/contact`, a thin server-side proxy that relays the payload to the platform's `/api/support-services` endpoint. This pattern keeps the platform's CORS policy strict (production subdomain only) while allowing identical form submissions from localhost during development — the proxy is exempt from the origin lock. Spam protection is layered: a honeypot field, a `formLoadedAt` timing check, and per-IP rate limiting are all enforced by the platform, with the visitor's real IP forwarded via `x-forwarded-for` so limits apply to the customer, not the shared serverless egress IP.

**All page copy** lives in a single typed module (`src/lib/profile-content.ts`), making content updates a no-deploy operation for the client.

**Outcome:** the site is live at `remotesupport.raymond-gray.org` and is the primary digital channel for Raymond Gray's remote support division, feeding structured inquiries directly into the platform's support request management workflow.

---

## Bulleted feature list (for the project page sidebar / tags)

- Single-page Next.js 16 (App Router) site deployed as a branded subdomain
- Fully animated with Framer Motion 12 (spring physics, staggered fade, blur-to-clear) and GSAP 3 ScrollTrigger
- Parallax hero with animated word-by-word headline reveal and decorative gradient panel
- Four service sections: Remote Admin, Customer Service, Operations Coordination, IT Helpdesk
- IT helpdesk tier table (L1 / L2 Standard / L2 Advanced) with scope and tooling per level
- Delivery model panel: engagement options, timezone coverage, assurance controls, pilot approach
- Experience profile cards — named client engagements with scope descriptions
- `LogoCycleGrid` — 40+ client logo display over a lazy-loaded looping video background
- Client testimonials section with attribution and date
- Contact form with honeypot + `formLoadedAt` timing-based spam protection
- Server-side contact proxy (`/api/contact`) — no CORS exposure, platform-enforced rate limiting
- Visitor IP forwarding via `x-forwarded-for` for accurate per-IP rate limits on the platform
- `sessionStorage` draft persistence — form state survives page refresh
- Full SEO metadata, Open Graph, and Twitter card configuration in `layout.tsx`
- Centralised content module — all copy in one typed file, no component changes needed for updates
- Custom self-hosted font stack: Gotham (display), Poppins (body), Avenir Next LT Pro

---

## Tech stack (one-liner + tag chips)

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion 12 · GSAP 3 + ScrollTrigger · Radix UI · Lucide React · Bun**

---

## The answered template

> **PROJECT:** Raymond Gray Remote Support
> **INDUSTRY:** Professional Services / Remote Operations
> **WHAT IT DOES:** A single-page public-facing marketing site for a remote support services firm, communicating their administration, customer service, and IT helpdesk offering to prospective SME clients and feeding qualified inquiries into the parent platform's support request pipeline.
> **THE PROBLEM:** Raymond Gray had no dedicated web presence for their remote support division. Prospective clients — UK and US-based SMEs — had nowhere to evaluate the full service offering, review IT helpdesk tier options and engagement models, or submit a qualified support inquiry. The company's existing digital footprint couldn't communicate the depth and structure of their delivery model.
> **WHAT YOU BUILT:** A polished single-page Next.js 16 + React 19 site with full-page animation (Framer Motion + GSAP ScrollTrigger), a parallax hero, four service sections, an IT tier breakdown table, a delivery model panel, an animated 40+ client logo ecosystem grid with looping video background, client testimonials, and a contact form with two-layer spam protection. A server-side proxy in `/api/contact` relays submissions to the parent platform's `/api/support-services` endpoint, keeping CORS locked and rate limiting platform-enforced. All page copy lives in a single typed module for no-deploy content updates.
> **THE RESULT:** The site is live at `remotesupport.raymond-gray.org` and is the primary digital channel for Raymond Gray's remote support division, driving structured inquiries directly into the platform's support request management workflow.
> **PERMISSION:** It's mine — I designed and built it as a freelance/contract project for Raymond Gray. The codebase, design system, and contact proxy architecture are mine; the brand, client data, and business content belong to the client. For portfolio use, **show the public marketing surface only** — do not display any form submissions, support request data, or admin-side responses.
> **LINKS:**
> - **Live:** `https://remotesupport.raymond-gray.org`
> - **GitHub:** *(private repo — use a screenshot tour or sanitized mirror for the portfolio)*
> - **Screenshots / case study:** *[link to a Notion / Framer / read.cv case study with visuals you control]*
> - **Parent platform:** `https://www.raymond-gray.org` *(the platform this site's contact form feeds into)*

---

## Variants you can swap in

### 1-line tagline
> A fully animated single-page marketing site for a remote support firm — custom font stack, 40+ client logos, GSAP + Framer Motion animations, and a server-side contact proxy integrating with the parent platform.

### 2-line tagline (for cards)
> Next.js 16 subdomain site for Raymond Gray Remote Support. Animated with Framer Motion + GSAP, featuring an IT tier breakdown, 40+ client logo ecosystem, and a server-side contact proxy that feeds structured inquiries into the parent platform.

### Twitter / X (≤280)
> Built the Raymond Gray Remote Support site: single-page Next.js 16 with Framer Motion + GSAP animations, a 40+ client logo grid over a video background, and a server-side form proxy that keeps CORS locked and routes leads straight into the parent platform. 🖥️

### LinkedIn post opener
> Most "marketing site" projects are a hero, three cards, and a contact form. This one has a server-side contact proxy that bypasses the parent platform's CORS lock from localhost, a 40+ client logo grid with a lazy-loaded looping video background, an IT helpdesk tier table, and a centralised typed content module so the client can update copy without touching a component. Built on Next.js 16 + Framer Motion + GSAP. 🌍

---

## Portfolio-page section order suggestion

1. **Hero** — short pitch + screenshot of the animated hero section
2. **The problem** — 2 bullets: no dedicated web presence, no structured inquiry channel
3. **What I built** — section-by-section walkthrough with one screenshot each (Services → Tiers → Delivery → Ecosystem → Contact)
4. **The hard parts** — 2 deep-dive cards: server-side contact proxy architecture · animated `LogoCycleGrid` with lazy-loaded video
5. **Result** — live URL, current usage as primary inquiry channel
6. **Stack** — tag chips
7. **Links** — live site, GitHub (or sanitized tour), parent platform

---

## Things to add once you have them

- [ ] A client testimonial quote from Raymond Gray (a one-liner attributed to "Founder" or "Director" is enough)
- [ ] A screenshot of the animated hero and the ecosystem logo grid (the most visually impressive sections)
- [ ] A short Loom or GIF showing the Framer Motion staggered animations playing on scroll
- [ ] Metrics if available (form submissions per month, inquiry conversion rate, etc.)
- [ ] A "lessons learned" line (e.g. "Why server-to-server proxying beats a shared webhook secret for subdomain form handling")
