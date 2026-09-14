# Codent Labs — Marketing Site

A marketing landing site for Codent Labs (brand, product & engineering studio), built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + **shadcn/ui** components
- **TypeScript** (strict, path alias `@/*` → repo root)
- **Playwright** for end-to-end tests
- Package manager: **Bun**

## Pages & routes

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `app/(site)/page.tsx` | Landing page: hero, services, showcase, numbers, process, testimonial, FAQ, CTA |
| `/about` | `app/(site)/about/page.tsx` | |
| `/services` | `app/(site)/services/page.tsx` | |
| `/process` | `app/(site)/process/page.tsx` | |
| `/work` | `app/(site)/work/page.tsx` | Case-study index |
| `/work/[slug]` | `app/(site)/work/[slug]/page.tsx` | Case-study detail pages |
| `/journal` | `app/(site)/journal/page.tsx` | Blog index |
| `/journal/[slug]` | `app/(site)/journal/[slug]/page.tsx` | Blog post pages |
| `/contact` | `app/(site)/contact/page.tsx` | Contact form (see below) |
| `/newsletter` | `app/(site)/newsletter/` | Newsletter signup + server action |
| `/feed.xml` | `app/feed.xml/route.ts` | RSS feed of journal posts (static) |
| `/og` | `app/og/route.tsx` | Dynamic 1200×630 OG image, takes `title`/`description` query params |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | Generated; sitemap covers pages, work and journal entries |

## Content

Journal posts and case studies are plain TypeScript data — no CMS:

- `lib/posts.ts` — journal posts (`Post` type) and the shared `SITE` constant (name, URL, contact email).
- `lib/cases.ts` — case studies (`CaseStudy` type): metrics, challenge, approach, outcome, tags, background gradients.

Adding a post or case study means adding an entry to the relevant file; the index pages, detail pages, sitemap, and RSS feed pick it up automatically.

## Forms & email

- **Contact form** (`/contact`): submissions POST as JSON to `CONTACT_API_URL` (using `CONTACT_API_KEY` as a Bearer token) when configured. Without a provider, submissions degrade to a prefilled `mailto:hello@codentlabs.com` draft so nothing is silently lost.
- **Newsletter capture** (footer): posts the email to `NEWSLETTER_ENDPOINT` when set; otherwise the form shows a "not connected yet" note.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `CONTACT_API_URL` | No | Endpoint the contact form submits to; falls back to `mailto:` |
| `CONTACT_API_KEY` | No | Sent as a `Bearer` token to `CONTACT_API_URL` |
| `NEWSLETTER_ENDPOINT` | No | Endpoint the newsletter form posts to |

## Getting started

```sh
bun install
bun run dev        # dev server on http://localhost:3000
```

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev` | Dev server |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve the production build |
| `lint` | `eslint` | Lint |
| `format` | `prettier --write "**/*.{ts,tsx}"` | Format |
| `typecheck` | `tsc --noEmit` | Type-check |
| `test` / `test:ui` | `playwright test` / `--ui` | E2E tests |

## Testing

End-to-end tests live in `tests/` (`smoke`, `routes`, `contact`, `faq`, `fonts`, `journal`, `proof`) and run in Chromium only. `playwright.config.ts` builds and starts the production server (`bun run build && bun run start`) before running, reusing an already-running server locally:

```sh
bun run test
```

In CI, tests retry twice (`retries: 2`), run single-worker, and `forbidOnly` is enforced. `.github/workflows/codeql.yml` runs CodeQL security scanning on the repo.
