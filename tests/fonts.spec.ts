import { test, expect } from "@playwright/test";

// Issue #41: body font must be self-hosted. No request may leave the origin
// for fonts.googleapis.com or fonts.gstatic.com, and the font must be
// delivered preloaded. (The Material Symbols icon font was removed when the
// site consolidated on lucide-react SVG icons.)
test.describe("Self-hosted fonts", () => {
  test("homepage makes no Google Fonts requests", async ({ page }) => {
    const externalFontRequests: string[] = [];

    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      if (
        url.hostname === "fonts.googleapis.com" ||
        url.hostname === "fonts.gstatic.com"
      ) {
        externalFontRequests.push(url.href);
      }
      route.continue();
    });

    await page.goto("/");

    expect(externalFontRequests, "no external font requests").toEqual([]);

    const externalStylesheets = await page
      .locator('link[rel="stylesheet"]')
      .evaluateAll((links) =>
        links
          .map((l) => (l as HTMLLinkElement).getAttribute("href"))
          .filter((href): href is string => !!href?.startsWith("http")),
      );
    expect(externalStylesheets).toEqual([]);
  });

  test("fonts are preloaded from the same origin", async ({ page }) => {
    await page.goto("/");

    const preloaded = await page
      .locator('link[rel="preload"][as="font"]')
      .evaluateAll((links) =>
        links.map((l) => (l as HTMLLinkElement).getAttribute("href") ?? ""),
      );

    expect(preloaded.length).toBeGreaterThan(0);
    for (const href of preloaded) {
      expect(href.startsWith("/_next/static/")).toBe(true);
    }
  });
});
