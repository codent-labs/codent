import { test, expect } from "@playwright/test";

// Hero social proof below the CTA (supersedes issue #39's proof bar): the
// shipped-count pill sits in the first viewport and names the clients. Dated
// metrics + denominators are asserted on the Numbers section below.
test.describe("Hero social proof and dated metrics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("social proof is visible without scrolling (first viewport)", async ({
    page,
  }) => {
    const pill = page.getByText("86 projects shipped").locator("..");
    await expect(pill).toBeVisible();

    const inViewport = await pill.evaluate((el) => {
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

  test("social proof shows shipped count and named clients", async ({
    page,
  }) => {
    const pill = page.getByText("86 projects shipped").locator("..");
    for (const client of ["Halcyon", "Sundae", "Folio"]) {
      await expect(pill.getByText(client)).toBeVisible();
    }
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