import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("Navbar renders with navigation links", async ({ page }) => {
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    const navLinks = nav.getByRole("link");
    await expect(navLinks.filter({ hasText: "Our Team" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Solutions" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "Showcase" })).toBeVisible();
    await expect(navLinks.filter({ hasText: "News" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Let's Connect" })).toBeVisible();
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
    await expect(stats.getByText("Shipped projects across 14 industries.")).toBeVisible();
    await expect(stats.getByText("Average client rating since 2019.")).toBeVisible();
  });

  test("Process section renders all four steps", async ({ page }) => {
    const process = page.locator("#process");
    await expect(process.getByRole("heading", { name: "Say hi" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Discover" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Design" })).toBeVisible();
    await expect(process.getByRole("heading", { name: "Ship" })).toBeVisible();
  });

  test("Testimonial section renders quote", async ({ page }) => {
    await expect(page.getByText("smartest")).toBeVisible();
    await expect(page.getByText("Rosa Madrigal")).toBeVisible();
    await expect(page.getByText("Head of Product · Halcyon")).toBeVisible();
  });

  test("CTA section renders contact area", async ({ page }) => {
    const cta = page.locator("#contact");
    await expect(cta.getByText("Got an idea")).toBeVisible();
    await expect(cta.getByRole("link", { name: "Book a 30-min chat" })).toBeVisible();
  });

  test("Footer renders with copyright and links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText("© 2026 Codent lab")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Twitter" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  });
});
