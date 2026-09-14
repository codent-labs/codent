A marketing landing page for Codent, built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

## Forms & email

- **Contact form** (`/contact`): submissions POST as JSON to `CONTACT_API_URL` (using `CONTACT_API_KEY` as a Bearer token) when configured. Without a provider, submissions degrade to a prefilled `mailto:hello@codentlabs.com` draft so nothing is silently lost.
- **Newsletter capture** (footer): posts the email to `NEWSLETTER_ENDPOINT` when set; otherwise the form shows a "not connected yet" note.