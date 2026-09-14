import { test, expect } from "@playwright/test";

// Issue #39: a persistent proof bar directly below the hero CTA, visible in the
// first viewport, and every metric carries a stated denominator/timespan.
test.describe("Proof bar and dated metrics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("proof bar is visible without scrolling (first viewport)", async ({
    page,
  }) => {
    const bar = page.locator(".codent-proofbar");
    await expect(bar).toBeVisible();

    const inViewport = await bar.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        innerHeight: window.innerHeight,
        scrollY: window.scrollY,
      };
    });
    expect(inViewport.scrollY).toBe(0);
    expect(inViewport.top).toBeGreaterThanOrEqual(0);
    expect(inViewport.bottom).toBeLessThanOrEqual(inViewport.innerHeight);
  });

  test("proof bar shows all four stats", async ({ page }) => {
    const bar = page.locator(".codent-proofbar");
    for (const stat of ["86+", "14", "4.9/5", "100%"]) {
      await expect(bar.getByText(stat, { exact: true })).toBeVisible();
    }
  });

  test("every proof stat carries a denominator or timespan", async ({
    page,
  }) => {
    const text = await page
      .locator(".codent-proofbar")
      .evaluate((el) => el.textContent ?? "");
    expect(text).toContain("since 2019");
    expect(text).toContain("industries served");
    expect(text).toContain("across 86 projects");
    expect(text).toContain("within a year");
  });

  test("Numbers section statistics are dated", async ({ page }) => {
    const numbersSection = page
      .locator("section")
      .filter({ has: page.locator("sup") });
    const text = await numbersSection.evaluate((el) => el.textContent ?? "");
    expect(text).toContain("2019–2026");
    expect(text).toContain("since 2019");
    expect(text).toContain("last 12 months");
    expect(text).toContain("within a year (measured since 2019)");
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