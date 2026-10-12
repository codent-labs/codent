/**
 * Single source of truth for Codent Labs' registered business details.
 *
 * Every legal page, the footer, the contact form's consent copy and the
 * Organisation JSON-LD all read from here, so a change to the entity name,
 * address or grievance contact happens in exactly one place.
 *
 * Keep these in sync with what is printed on invoices and on the GST/registrar
 * records. Indian consumer and e-commerce rules (Consumer Protection Act 2019,
 * rules made under the IT Act 2000) require the seller name, postal address and
 * a grievance contact to be published, so these are load-bearing values - do
 * not put placeholders here.
 */

export const BUSINESS = {
  /** Trading name used in marketing copy. */
  tradingName: "Codent Labs",
  /**
   * Legal entity. Codent Labs is a sole proprietorship: the proprietor trades
   * under this name, there is no separate legal person, and contracts are made
   * in the proprietor's name. Say so plainly rather than implying a company.
   */
  legalForm: "sole proprietorship",
  legalName: "Codent Labs (sole proprietorship)",

  /** Registered office. Also the service address for Indian postal notices. */
  address: {
    line1: "A-220, First Floor, Double Storey",
    line2: "Kalkaji, New Delhi",
    postalCode: "110019",
    country: "India",
  },

  email: "hello@codentlabs.com",
  phone: "+91 8376045365",
  phoneHref: "tel:+918376045365",

  siteUrl: "https://www.codentlabs.com",
  jurisdiction: "India",
  /** Courts that govern contracts, per the Terms of Service. */
  jurisdictionCity: "New Delhi",
  jurisdictionState: "Delhi",

  /** Year the practice began - a verifiable fact, unlike the marketing stats. */
  established: 2019,

  /**
   * Grievance officer. The IT (Intermediary Guidelines and Digital Media Ethics
   * Code) Rules 2021 and the Consumer Protection (E-Commerce) Rules 2020 both
   * require a named, reachable grievance contact.
   */
  grievance: {
    label: "Grievance Officer",
    email: "grievances@codentlabs.com",
    responseWindowDays: 30,
  },
} as const;

/** "A-220, First Floor, Double Storey, Kalkaji, New Delhi 110019, India" */
export const BUSINESS_ADDRESS_ONE_LINE = [
  BUSINESS.address.line1,
  BUSINESS.address.line2,
  BUSINESS.address.postalCode,
  BUSINESS.address.country,
].join(", ");

/** ISO date of the current policy revision. Bump this when the text changes. */
export const POLICY_REVISED = "2026-10-12";

/** Human-facing "Last updated" string shared by all four policy pages. */
export const POLICY_UPDATED_LABEL = new Date(
  `${POLICY_REVISED}T00:00:00Z`,
).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
