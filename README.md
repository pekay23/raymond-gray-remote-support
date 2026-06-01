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
