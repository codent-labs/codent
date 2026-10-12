"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Cookie-consent state, persisted in `localStorage`.
 *
 * There are two categories and the distinction is the whole point:
 *
 * - `necessary`  Strictly required for the site to function (theme choice,
 *                consent state itself). No consent gate, no expiry.
 * - `analytics`  Optional. Nothing is loaded until consent is `granted`.
 *
 * `localStorage` is an external mutable store, so this reads it through
 * `useSyncExternalStore` rather than copying it into state inside an effect.
 * That matters for correctness, not just lint: the server snapshot is always
 * `null`, so a returning visitor's stored choice is applied by React during
 * hydration instead of after a flash of an unnecessary banner.
 *
 * Any analytics added later MUST gate its script behind `useConsent()` and
 * must not read the storage key directly - that keeps the consent check in one
 * auditable place.
 */

export const CONSENT_STORAGE_KEY = "codent.consent.v1";

export type ConsentCategory = "necessary" | "analytics";
export type ConsentValue = "granted" | "denied";

export type ConsentState = Record<ConsentCategory, ConsentValue>;

export type ConsentRecord = {
  /** Schema version - bump to re-prompt everyone after a material change. */
  version: number;
  necessary: ConsentValue;
  analytics: ConsentValue;
  /** ISO timestamp of the decision. */
  decidedAt: string;
};

export const CONSENT_VERSION = 1;

/** Latest value, cached so `getSnapshot` stays referentially stable. */
let cache: ConsentRecord | null = null;
const listeners = new Set<() => void>();

function read(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    // Private-mode Safari and blocked-storage setups throw on access. Absence
    // of a readable record means "not decided", which is the safe default.
    return null;
  }
}

function getSnapshot(): ConsentRecord | null {
  if (cache === null) cache = read();
  return cache;
}

/** The server has no localStorage, so it always renders "not yet decided". */
function getServerSnapshot(): ConsentRecord | null {
  return null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Another tab changing the choice should update this one too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(analytics: ConsentValue) {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    necessary: "granted",
    analytics,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
  cache = record;
  listeners.forEach((listener) => listener());
}

export type ConsentApi = {
  /** `null` until a stored record has been read on the client. */
  consent: ConsentState | null;
  /** True once a stored choice exists, so the banner can stay dismissed. */
  decided: boolean;
  /** True only for the `analytics` category - use this to gate scripts. */
  analyticsAllowed: boolean;
  /** `grant(["analytics"])` to opt in; `denyAll()` to opt out. */
  grant: (categories: ConsentCategory[]) => void;
  denyAll: () => void;
};

export function useConsent(): ConsentApi {
  const record = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const grant = useCallback((categories: ConsentCategory[]) => {
    write(categories.includes("analytics") ? "granted" : "denied");
  }, []);

  const denyAll = useCallback(() => {
    write("denied");
  }, []);

  const consent: ConsentState | null = record
    ? { necessary: record.necessary, analytics: record.analytics }
    : null;

  return {
    consent,
    decided: record !== null,
    // Never treat an unread state as permission. A visitor who declined, or has
    // not yet answered, must not get analytics.
    analyticsAllowed: record?.analytics === "granted",
    grant,
    denyAll,
  };
}
