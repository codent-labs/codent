export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  tags: string[];
  bg: string;
  duration: string;
  role: string;
  headline: string;
  summary: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "maru",
    title: "Maru - banking, softened.",
    client: "Maru",
    industry: "Fintech",
    tags: ["fintech", "app"],
    bg: "linear-gradient(135deg,#FFE9D6 0%,#F7B2FB 60%,#786EF1 100%)",
    duration: "6 months",
    role: "Product design, engineering",
    headline:
      "A banking app that doesn't lecture you about saving - it just makes saving less ugly.",
    summary:
      "Maru came to us with a working backend, a wariness of banks, and a mobile app that felt like a spreadsheet. We rebuilt the product around calm: one primary action per screen, language that reads like a friend who happens to be good with money, and an onboarding flow that still converts without a single 'empower your future' headline.",
    metrics: [
      { value: "+34", label: "NPS lift" },
      { value: "×2.1", label: "Activation" },
      { value: "4.8★", label: "App store rating" },
    ],
    challenge:
      "Maru's team had spent two years making the money engine correct - budgets, rules, approvals. What shipped to users was correct and unusable: jargon-heavy copy, nine actions competing for every screen, and an empty state that made first-time depositors feel incompetent.",
    approach: [
      "We ran a week of interviews with users who had churned after signup. The pattern was consistent: people didn't leave because of fees or features - they left because the app made them feel judged.",
      "The design system centered on a single principle: one primary action per screen. Every secondary control moved into a drawer or behind the first swipe, and the copy passed a 'grandmother test' - if it needed a footnote, it got rewritten.",
      "Two whiteboard cycles and one clickable prototype later (about 23 days), the flow was tested on ten real users before a line of production code changed.",
    ],
    outcome:
      "Activation doubled within a quarter of launch, NPS climbed by 34 points, and the rebuild shipped without a single migration regression - the hand-off doc was 11 pages, and Maru's engineers have since shipped three releases from it without calling us.",
  },
  {
    slug: "folio",
    title: "Folio - a library that reads you.",
    client: "Folio",
    industry: "Consumer / SaaS",
    tags: ["product", "brand"],
    bg: "linear-gradient(135deg,#DDF3FF 0%,#5588FB 100%)",
    duration: "4 months",
    role: "Brand, product design",
    headline:
      "A reading companion with a personality, built from a connection to a library lobby.",
    summary:
      "Folio wanted to be a reading app that 'knows you'. We turned that vague ambition into a brand and product with actual opinions - one that recommends based on mood, tolerance and unfinished business, not just genre graphs.",
    metrics: [
      { value: "4.9/5", label: "App store rating" },
      { value: "2.4×", label: "Reading retention" },
      { value: "3 wks", label: "Brand to prototype" },
    ],
    challenge:
      "Folio had a polished reader and an identity crisis: every screen said the same thing in different fonts. The brand - name, voice, palette, mascotish icon - was holding the product back from being recommended out loud.",
    approach: [
      "Brand came first, in a fixed six-week engagement: voice territory ('the friend who's read it'), a warm palette lifted from a library lobby, and type that survived both the lock screen and the long read.",
      "Product work took the reading flow apart: why the shelf, why the progress ring, why the DNF (did not finish) list is comforting rather than shameful. Every decision traced to a single metric - time lost to the app means we failed.",
      "The prototype landed in three weeks, and the recommendation engine's 'jitter' was visibly referenced in the empty state, turning a technical quirk into personality.",
    ],
    outcome:
      "Folio's reread rate is 2.4× the category norm, the brand got them listed in two app-store editorial roundups, and their product team has kept the voice guide pinned to the wall ever since.",
  },
  {
    slug: "sundae",
    title: "Sundae - DTC ice cream.",
    client: "Sundae",
    industry: "DTC / E-commerce",
    tags: ["brand", "ecomm"],
    bg: "linear-gradient(135deg,#FFF1B6 0%,#FF9A5E 100%)",
    duration: "5 months",
    role: "Brand, growth, engineering",
    headline:
      "Ice cream that ships frozen and sells direct - without ever looking like it's trying too hard.",
    summary:
      "Sundae's problem wasn't the ice cream. It was a brand that looked like a hobby and a checkout that leaked first-time buyers. We gave the brand a sunny, self-aware voice and rebuilt the storefront's three critical flows.",
    metrics: [
      { value: "+38%", label: "Checkout conversion" },
      { value: "1.9×", label: "Repeat orders" },
      { value: "90 days", label: "To relaunch" },
    ],
    challenge:
      "Sundae shipped nationally with dry ice magic no one was excited about and a site that answered every question except 'why should I care'. Brand assets were a logo and a gradient; the return policy was buried; and the cart page convinced exactly no one to pay $12 shipping.",
    approach: [
      "We spent the first two weeks of brand work on voice - 'knowing, not self-important'. The result was a system of small runs, flavor drops and honest nutrition copy that reads like it was written by someone who eats the product.",
      "In parallel, product engineers mapped the checkout to a single-airline flow: one page, three decisions, free-shipping threshold surfaced as a fun scavenger countdown instead of a guilt trip.",
      "Growth work launched the 'flavor club' as a two-step subscribe flow, stealing the old newsletter's worst habit - the wall of text - and replacing it with a single 'which flavor first?' question.",
    ],
    outcome:
      "Checkout conversion rose 38% in the first month, repeat orders nearly doubled, and the relaunch shipped on time at 90 days - including a brand kit Sundae's in-house designer has since used for two flavor seasons on her own.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function hasCaseStudy(slug: string): boolean {
  return caseStudies.some((c) => c.slug === slug);
}