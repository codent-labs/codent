import { test, expect } from "@playwright/test";

// Hero social proof sits just below the hero (moved out of the hero itself so
// the hero keeps a single, uncluttered message). Dated metrics + denominators
// are asserted on the Numbers section below.
test.describe("Hero social proof and dated metrics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // The pill now sits inside the hero section but still below the headline and
  // CTAs. Assert the ordering that matters - proof follows the message rather
  // than competing with it - rather than the pill living outside the section.
  test("social proof follows the hero headline and CTAs", async ({ page }) => {
    const pill = page.getByText("86 projects shipped").locator("..");
    await expect(pill).toBeVisible();

    const ctaBottom = await page
      .getByRole("button", { name: "See our work" })
      .evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
    const pillTop = await pill.evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY,
    );
    expect(pillTop).toBeGreaterThan(ctaBottom);
  });

  test("social proof shows shipped count and named clients", async ({
    page,
  }) => {
    const pill = page.getByText("86 projects shipped").locator("..");
    for (const client of ["Halcyon", "Sundae", "Folio"]) {
      await expect(pill.getByText(client)).toBeVisible();
    }
  });

  // Regression: the hero uses the shared Avatar primitives. The count bubble
  // is decorative (the pill text states the total), so it must stay out of the
  // accessibility tree rather than being announced a second time.
  test("social proof renders avatars with a decorative count", async ({
    page,
  }) => {
    const group = page.locator('[data-slot="avatar-group"]');
    await expect(group).toBeVisible();
    await expect(group.locator('[data-slot="avatar"]')).toHaveCount(3);

    const count = group.locator('[data-slot="avatar-group-count"]');
    await expect(count).toHaveText("+24");
    await expect(count).toHaveAttribute("aria-hidden", "true");
  });

  test("Numbers section statistics are dated", async ({ page }) => {
    const numbersSection = page
      .locator("section")
      .filter({ has: page.locator("sup") });
    const text = await numbersSection.evaluate((el) => el.textContent ?? "");
    expect(text).toContain("2019-2026");
    expect(text).toContain("since 2019");
    expect(text).toContain("last 12 months");
    expect(text).toContain("Industries shipped in since 2019");
  });

  test("Halcyon metrics render as a compact stat strip on the featured card", async ({
    page,
  }) => {
    const card = page.locator("section").filter({
      has: page.getByText("Halcyon 3.0", { exact: true }),
    });
    await expect(card).toBeVisible();
    await expect(card.getByText("+34", { exact: true })).toBeVisible();
    await expect(card.getByText("×2.1", { exact: true })).toBeVisible();
    await expect(card.getByText("NPS lift")).toBeVisible();
    await expect(card.getByText("Activation")).toBeVisible();
  });
});