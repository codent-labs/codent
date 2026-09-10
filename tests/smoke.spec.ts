import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("Navbar renders with navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    const navLinks = nav.getByRole("link");
    await expect(navLinks.filter({ hasText: "Solutions" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Showcase" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Process" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Contact" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Let's Connect" })).toBeVisible();
  });

  // Regression for issue #24: every nav anchor must point at an element that
  // actually exists on the page (previously #our-team / #news were dead).
  test("Navbar anchors all resolve to existing sections", async ({ page }) => {
    const nav = page.getByRole("navigation");
    const hrefs = await nav.getByRole("link").evaluateAll((links) =>
      links
        .map((a) => (a as HTMLAnchorElement).getAttribute("href"))
        .filter((href): href is string => !!href?.startsWith("#")),
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      const target = page.locator(href);
      await expect(target, `anchor ${href} has no matching element`).toHaveCount(1);
    }
  });

  test("Hero section renders with headline and CTAs", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero.getByText("Big ideas, made")).toBeVisible();
    await expect(hero.getByText("small enough to ship.")).toBeVisible();
    await expect(hero.getByRole("link", { name: "Start a project" })).toBeVisible();
    await expect(hero.getByRole("link", { name: "See our work" })).toBeVisible();
    await expect(hero.getByText("86 projects shipped")).toBeVisible();
  });

  test("LogosStrip renders trusted brands", async ({ page }) => {
    const strip = page.getByText("Trusted by curious teams").locator("..");
    await expect(strip.getByText("Halcyon")).toBeVisible();
    await expect(strip.getByText("Northwind")).toBeVisible();
    await expect(strip.getByText("Sundae")).toBeVisible();
    await expect(strip.getByText("Folio")).toBeVisible();
  });

  test("Services section renders all four services", async ({ page }) => {
    const services = page.locator("#solutions");
    await expect(services.getByRole("heading", { name: "Brand & Identity" })).toBeVisible();
    await expect(services.getByRole("heading", { name: "Product Design" })).toBeVisible();
    await expect(services.getByRole("heading", { name: "Engineering" })).toBeVisible();
    await expect(services.getByRole("heading", { name: "Growth & Launch" })).toBeVisible();
  });

  test("Showcase section renders work samples", async ({ page }) => {
    const showcase = page.locator("#showcase");
    await expect(showcase.getByText("Maru — banking, softened.")).toBeVisible();
    await expect(showcase.getByText("Folio — a library that reads you.")).toBeVisible();
    await expect(showcase.getByText("Sundae — DTC ice cream.")).toBeVisible();
  });

  test("Numbers section renders stats", async ({ page }) => {
    const stats = page.locator("section").filter({ has: page.locator("sup") });
    await expect(stats.first()).toBeVisible();
    await expect(stats.getByText("Projects shipped across 14 industries since 2019.")).toBeVisible();
    await expect(stats.getByText("Average client rating across 86 projects, 2019–2026.")).toBeVisible();
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
    await expect(cta.getByRole("link", { name: "Tell us where you're stuck" })).toBeVisible();
  });

  test("Footer renders with copyright and links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText("© 2026 Codent lab")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Twitter" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  });

  // Regression for issues #25/#40: footer contact links must be actionable and
  // use the domain inbox, never a public Gmail address.
  test("Footer email and phone links use mailto:/tel: hrefs", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "hello@codentlabs.com" })).toHaveAttribute(
      "href",
      "mailto:hello@codentlabs.com",
    );
    await expect(footer.getByRole("link", { name: "+91 8376045365" })).toHaveAttribute(
      "href",
      "tel:+918376045365",
    );
  });
});
