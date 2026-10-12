import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("Navbar renders with navigation links", async ({ page }) => {
    // The site now has two nav landmarks (primary + footer legal), so both are
    // named; scope to the primary one rather than assuming a single nav.
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();

    const navLinks = nav.getByRole("link");
    await expect(navLinks.filter({ hasText: "Work" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Services" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Process" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Journal" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Start a project" })).toBeVisible();
  });

  // Regression for issues #24/#36: every nav link must resolve to a real
  // crawlable URL (previously #our-team / #news were dead anchors).
  test("Navbar links all resolve to real routes", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Primary" });
    const hrefs = await nav.getByRole("link").evaluateAll((links) =>
      links
        .map((a) => (a as HTMLAnchorElement).getAttribute("href"))
        .filter((href): href is string => !!href),
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      expect(href.startsWith("#")).toBe(false);
      const res = await page.request.get(href);
      expect(res.status(), `route ${href} loads`).toBe(200);
    }
  });

  test("Hero section renders with headline and CTAs", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero.getByText("Big ideas, made")).toBeVisible();
    await expect(hero.getByText("small enough to ship.")).toBeVisible();
    // CTAs are router-navigating buttons, not links.
    await expect(hero.getByRole("button", { name: "Start a project" })).toBeVisible();
    await expect(hero.getByRole("button", { name: "See our work" })).toBeVisible();
    // Social proof now lives just below the hero, not inside it.
    await expect(page.getByText("86 projects shipped")).toBeVisible();
  });

  test("Services section renders all four services", async ({ page }) => {
    const services = page.locator("#solutions");
    // Each practice appears once per marquee repeat - assert the first.
    await expect(services.getByRole("heading", { name: "Brand & Identity" }).first()).toBeVisible();
    await expect(services.getByRole("heading", { name: "Product Design" }).first()).toBeVisible();
    await expect(services.getByRole("heading", { name: "Engineering" }).first()).toBeVisible();
    await expect(services.getByRole("heading", { name: "Growth & Launch" }).first()).toBeVisible();
  });

  test("Showcase section renders work samples", async ({ page }) => {
    const showcase = page.locator("#showcase");
    await expect(showcase.getByText("Maru - banking, softened.")).toBeVisible();
    await expect(showcase.getByText("Folio - a library that reads you.")).toBeVisible();
    await expect(showcase.getByText("Sundae - DTC ice cream.")).toBeVisible();
  });

  test("Numbers section renders stats", async ({ page }) => {
    const stats = page.locator("section").filter({ has: page.locator("sup") });
    await expect(stats.first()).toBeVisible();
    await expect(stats.getByText("Projects shipped across 14 industries since 2019.")).toBeVisible();
    await expect(stats.getByText("Average client rating across 86 projects, 2019-2026.")).toBeVisible();
  });

  test("Process section renders all four steps", async ({ page }) => {
    const process = page.locator("#process");
    await expect(process.getByRole("heading", { name: "Say hi" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Discover" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Design" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Ship" })).toBeVisible();
  });

  test("Testimonial section renders quote", async ({ page }) => {
    const quote = page.locator("blockquote");
    await expect(quote.getByText("smartest", { exact: true })).toBeVisible();
    await expect(page.getByText("Rosa Madrigal")).toBeVisible();
    await expect(page.getByText("Head of Product · Halcyon")).toBeVisible();
  });

  test("CTA section renders contact area", async ({ page }) => {
    const cta = page.locator("#contact");
    await expect(cta.getByText("Got an idea")).toBeVisible();
    await expect(cta.getByRole("link", { name: "Start a project" })).toBeVisible();
  });

  test("Footer renders with copyright and links", async ({ page }) => {
    const footer = page.locator("footer");
    // The year is now read from the clock rather than hard-coded, so assert
    // the shape instead of a literal that goes stale every January.
    await expect(
      footer.getByText(new RegExp(`© ${new Date().getFullYear()} Codent Labs`)),
    ).toBeVisible();
    await expect(footer.getByRole("link", { name: "About us" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "RSS feed" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Case studies" })).toBeVisible();
  });

  // Regression for issues #25/#40: footer contact links must be actionable and
  // use the domain inbox, never a public Gmail address.
  test("Footer email and phone links use mailto:/tel: hrefs", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "hello@codentlabs.com" }).first()).toHaveAttribute(
      "href",
      "mailto:hello@codentlabs.com",
    );
    await expect(footer.getByRole("link", { name: "+91 8376045365" })).toHaveAttribute(
      "href",
      "tel:+918376045365",
    );
  });
});
