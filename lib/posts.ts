export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, YYYY-MM-DD
  readingMinutes: number;
  content: string[];
};

export const SITE = {
  name: "Codent Labs",
  url: "https://www.codentlabs.com",
  email: "hello@codentlabs.com",
};

const posts: Post[] = [
  {
    slug: "how-we-scope-a-prototype-in-23-days",
    title: "How we scope a prototype in 23 days (median)",
    description:
      "What actually happens between “this is a fuzzy bet” and a clickable prototype — and why we time-box it to a median of 23 days.",
    date: "2026-08-12",
    readingMinutes: 5,
    content: [
      "We quote a median of 23 days from brief to a clickable prototype. Not six months of discovery, and not a weekend sketch. This is what those 23 days actually contain, why the number isn't a sales trick, and where the variance comes from.",
      "Week one is the interview week. We pair with your team for a week of short conversations — the founder's instinct about the market, the product owner's list of must-haves versus should-haves, the support tickets that keep coming back. Most of what people call scope is actually unspoken fear about who the product is for. Interviews surface that in days, not months.",
      "Week two we draw. Wireframes, flows, and the occasional outright no — we kill ideas on paper so they don't ride along into build. The rule: every screen must exist for a reason you can explain in one sentence.",
      "The last week we make it real. Working UI, real copy, clickable on a device. It's hi-fi enough that a roomful of users can react honestly, and light enough that we can throw it away — because most prototypes should be thrown away.",
      "The 23 days is a median, not a promise for every project. Simple consumer flows come in faster; riskier B2B journeys run closer to six weeks. You get a date in the one-pager within 48 hours of first contact, and we tell you up front what would move it.",
      "Why keep it this tight? A prototype loses its job the moment it starts pretending to be the product. Its job is to force a decision — and decisions get better after 23 uncomfortable days than after six calm months.",
    ],
  },
  {
    slug: "the-hand-off-doc-your-devs-wont-cry-over",
    title: "What a hand-off doc your devs won't cry over looks like",
    description:
      "The honest difference between a hand-off that lands and one that dies in a backlog: it's not the purity of the code — it's the decisions you hand over with it.",
    date: "2026-07-02",
    readingMinutes: 6,
    content: [
      "Hand-offs fail for reasons that have nothing to do with code quality. A hand-over that “won't make your devs cry” is less a document and more an insurance policy against the most expensive question in software: so, what were all those decisions actually for?",
      "Every hand-off we ship carries four sections. The first is the intent map: for each screen, the job it does in the product and the one metric it's accountable to. Copy, states and error handling all trace back to that single sentence, so the team inherits reasons, not just pixels.",
      "The second is the decision log — the twenty or thirty calls that look obvious in hindsight but weren't at the time: why we used this empty state, why the onboarding step is skippable, why that one button lives where it does. A decision log is what turns a design review into a roadmap.",
      "The third is the honest “not meant to work yet” list. Every real product has scrappy corners; pretending otherwise teaches your team to distrust the whole hand-off. Naming them turns surprise bugs into scheduled follow-ups.",
      "The fourth is the runbook: how it deploys, what breaks first, which tests actually matter, who to ping. Your devs inherit tools, not mysteries.",
      "That's also why we ship the doc with every prototype, not just full builds. By the time a project is “done”, the hand-off has been written three times — and the third version is boringly good.",
    ],
  },
  {
    slug: "why-we-quote-six-weeks-for-brand-work",
    title: "Why we quote six weeks for brand work",
    description:
      "Brand work isn't one logo; it's a system your team can run after we leave. Six weeks is what that actually takes — and two sprints, and a fixed price.",
    date: "2026-05-20",
    readingMinutes: 4,
    content: [
      "A single logo can be delivered in a week. A brand system that a team can operate after we leave takes six. The difference is the deliverable: not an asset, but a set of decisions encoded so well they survive contact with reality.",
      "Weeks one and two are voice and territory: what you stand for, what you refuse to say, and which audience gets woken up at 4am to ship. Most rebrands fail in this phase because it was skipped, so we don't skip it.",
      "Weeks three and four are the visual system: type, color, shape, motion. Exploration happens on paper first, then in application — because a mark that looks strong on a white site and breaks on a dark app was never a mark, just a render.",
      "Weeks five and six are application and kit: the logo locked into the surfaces it'll actually live on, a short style guide, and the files your team can use without calling us. That's the moment a brand stops being a project and becomes infrastructure.",
      "We quote brand work as a fixed six-week engagement with two sprints — no hourly meters, no retainer creep. And yes, a bigger faster agency can deliver a logo in three weeks. But brand work compounds: the marks that age are the ones built on principles, tested in applications, and handed over with the reasoning that produced them.",
    ],
  },
  {
    slug: "what-100-percent-of-clients-return-means",
    title: "What “100% of clients return” actually means",
    description:
      "A return-rate stat can hide more than it shows. Here's the denominator behind ours, and why we'd only ever publish it this narrowly.",
    date: "2026-04-05",
    readingMinutes: 4,
    content: [
      "Every year we publish a line that makes people raise an eyebrow: 100% of clients return within a year. It deserves unpacking, because a return-rate claim without a denominator is marketing, not a metric.",
      "The denominator is every client we've taken on since 2019 — 86 projects across 14 industries. “Return” is defined narrowly: a second paid engagement within twelve months of a completed one. Not a nice email, not a chat at a conference — a second project.",
      "The number being small is exactly why we trust it. With a two-person lab at the denominator, one disgruntled client is immediately visible in the data; we can't hide behind a pool of a thousand anonymous reviews.",
      "Why we think it holds: fixed-scope pricing means the estimate is the estimate; the 48-hour one-pager sets expectations before a rupee moves; and hand-offs that don't strand your team mean the second project starts from trust instead of repair.",
      "If you want the stat that tells you more about how we behave: 23 days median from brief to prototype, across fintech, DTC and B2B SaaS. That one is harder to game and says more about how we work under pressure.",
    ],
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function hasPost(slug: string): boolean {
  return posts.some((p) => p.slug === slug);
}