"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useConsent } from "@/hooks/use-consent";

/**
 * Vercel Web Analytics, mounted only after explicit consent.
 *
 * Two deliberate choices:
 *
 * 1. The component is not rendered at all until consent is `granted`, so the
 *    vendor script is never fetched, parsed or executed for a visitor who has
 *    not opted in. That is the actual guarantee - there is nothing to "reset"
 *    later, because nothing was loaded.
 *
 * 2. `beforeSend` drops the fields we do not need: referrer, user agent and
 *    path parameters. Page URL and country remain because they are what makes
 *    the aggregate numbers usable.
 */
export function Analytics() {
  const { consent, analyticsAllowed } = useConsent();

  if (!analyticsAllowed || consent === null) return null;

  return (
    <VercelAnalytics
      mode="production"
      beforeSend={(event) => {
        // The published type is a closed union, so redaction needs a widening
        // cast. Returning null would drop the event entirely; we only remove
        // fields we have no use for.
        const mutable = event as unknown as Record<string, unknown>;
        delete mutable.referrer;
        delete mutable.userAgent;
        delete mutable.utm;
        return event;
      }}
    />
  );
}

export default Analytics;
