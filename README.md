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
| `/contact` | `app/(site)/contact/page.tsx` | Contact form — delivers via Resend, degrades to `mailto:` (see Forms) |
| `/privacy` | `app/(site)/privacy/page.tsx` | Privacy policy |
| `/cookies` | `app/(site)/cookies/page.tsx` | Cookie policy |
| `/terms` | `app/(site)/terms/page.tsx` | Terms of service |
| `/refund-policy` | `app/(site)/refund-policy/page.tsx` | Refund policy |
| `/newsletter` | `app/(site)/newsletter/` | Newsletter signup server action (subscribes to a Resend Audience) |
| `/feed.xml` | `app/feed.xml/route.ts` | RSS feed of journal posts (static) |
| `/og` | `app/og/route.tsx` | Dynamic 1200×630 OG image, takes `title`/`description` query params |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | Generated; sitemap covers pages, work and journal entries |

## Content

Journal posts and case studies are plain TypeScript data — no CMS:

- `lib/posts.ts` — journal posts (`Post` type) and the shared `SITE` constant (name, URL, contact email).
- `lib/cases.ts` — case studies (`CaseStudy` type): metrics, challenge, approach, outcome, tags, background gradients.
- `lib/business.ts` — the registered business details. Single source of truth for the entity name, postal address, contact details, grievance officer and policy revision date, read by the four legal pages, the footer, the contact page, the server actions and the Organization JSON-LD. Change these here and nowhere else.
- `lib/email.ts` — outbound email via the Resend REST API, plus HTML escaping for untrusted form input.
- `lib/newsletter.ts` — newsletter subscriptions against a Resend Audience.

Adding a post or case study means adding an entry to the relevant file; the index pages, detail pages, sitemap, and RSS feed pick it up automatically.

## Forms & email

Delivery is [Resend](https://resend.com). Both forms work with no configuration at all — they degrade, and they say so rather than faking a success.

- **Contact form** (`/contact`): a valid, consented submission emails the enquiry to the studio inbox, then sends the visitor a confirmation. `reply_to` is set to the visitor's address, so replying to the notification reaches them rather than our own inbox. If delivery fails it does **not** report success — it opens a prefilled `mailto:` draft instead.
- **Newsletter capture** (footer): adds the address to a Resend Audience. Re-subscribing an existing address reports "already on the list" rather than an error. Resend appends its hosted one-click unsubscribe link to every campaign; that URL carries the API key, so it is deliberately never rendered in the UI.

Without `RESEND_API_KEY` the contact form opens a `mailto:` draft; without `RESEND_AUDIENCE_ID` the newsletter says it is not connected.

Delivery lives in `lib/email.ts` and `lib/newsletter.ts`. Both call the Resend REST API directly rather than adding the SDK — one POST each, and a direct call keeps the failure modes visible. Every function returns a discriminated `{ ok, reason }` instead of throwing, so a caller cannot mistake a failure for a delivery.

### Form defences

Both forms share the same protections:

| Defence | Where | Notes |
| --- | --- | --- |
| Consent checkbox | `actions.ts` + the form | Unchecked by default, re-checked server-side. `required` is a browser hint; the action is the control, since a POST can be crafted without the field |
| Length caps | form `maxLength` + `LIMITS` in the action | Duplicated server-side, because client validation is a convenience |
| Honeypot | `company_website` input | `sr-only` + `aria-hidden` + `tabIndex={-1}`. Present in the DOM where bots look, absent for people. Filled submissions report success without contacting anyone |
| Rate limit | `actions.ts` | Fixed window, keyed on the submitted address. In-memory and per-instance: it stops casual spam, not a determined attacker. Not a security control |
| `reply_to` | `lib/email.ts` | Stops replies landing in the studio inbox |

A rejected submission carries a `field` marker, which the client uses to place the error next to the control it refers to.

### Environment variables

Copy `.env.example` to `.env.local`. Every variable is optional.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | No | Enables real delivery. Without it both forms degrade as described above |
| `RESEND_FROM_EMAIL` | No | The `From` address. Must be on a domain verified in Resend — `onboarding@resend.dev` works for a first test but Resend only delivers to the account owner until a domain is verified |
| `RESEND_FROM_NAME` | No | Display name for the `From` header |
| `RESEND_AUDIENCE_ID` | No | The Resend Audience holding newsletter subscribers |
| `RESEND_API_BASE_URL` | No | Overrides the Resend host so tests can point at a local stub. Leave unset in production |

## Legal & privacy

| Piece | Where | Notes |
| --- | --- | --- |
| Privacy / Cookie / Terms / Refund policies | `app/(site)/{privacy,cookies,terms,refund-policy}/page.tsx` | Share `components/LegalLayout.tsx`; text is data in each page's `sections` array |
| Consent state | `hooks/use-consent.ts` | `localStorage` key `codent.consent.v1`, read via `useSyncExternalStore` |
| Consent banner | `components/CookieConsent.tsx` | Dismissible, keyboard-operable, revocable from any page |
| Analytics gating | `components/Analytics.tsx` | Mounts `@vercel/analytics/next` only when analytics consent is `granted` |

Registered business details live in `lib/business.ts` and are published in the footer, on the contact page, and in the Organization JSON-LD. Publishing the seller name, postal address and a grievance contact is required for an Indian seller under the Consumer Protection Act 2019 and the rules made under the IT Act 2000.

**Adding analytics or a third-party embed?** Gate it behind `useConsent()` and add it to the cookie policy table. Do not read the storage key directly — the consent check belongs in one auditable place. `tests/compliance.spec.ts` fails the build if an analytics request is made without consent, or if a third-party iframe or remote script appears.

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

End-to-end tests live in `tests/` and run in Chromium only:

| Spec | Covers |
| --- | --- |
| `smoke`, `routes`, `faq`, `fonts`, `proof`, `journal` | Existing site behaviour |
| `contact` | Form validation, consent enforcement, honeypot, server-side caps |
| `compliance` | Legal pages, cookie consent gating, absence of third-party embeds, structured data |
| `forms-live` | Delivery behaviour — asserts the success path when a provider is configured, the degraded path when not |
| `forms-failure` | Skips itself unless `RESEND_API_BASE_URL` is set; proves a failing provider never produces a false success |

`forms-failure` exists because "the happy path works" says nothing about the case that actually hurts: a provider returning 500 and the form telling the visitor their message was sent. To exercise it, point `RESEND_API_BASE_URL` at a stub that always fails.

`playwright.config.ts` builds and starts the production server (`bun run build && bun run start`) before running, reusing an already-running server locally:

```sh
bun run test
```

In CI, tests retry twice (`retries: 2`), run single-worker, and `forbidOnly` is enforced. `.github/workflows/codeql.yml` runs CodeQL security scanning on the repo.
