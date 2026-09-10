import { test, expect } from "@playwright/test";

// Issue #41: the icon font (Material Symbols Rounded) and body font must be
// self-hosted. No request may leave the origin for fonts.googleapis.com or
// fonts.gstatic.com, and the fonts must be delivered preloaded.
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

  test("icon glyphs render as single glyphs (PUA codepoints, not ligatures)", async ({
    page,
  }) => {
    await page.goto("/");

    // Every icon is rendered as a PUA codepoint that the subset font maps in
    // its cmap — regression guard for the broken-ligature issue.
    const glyphs = [
      0xe2bd, 0xe87d, 0xe037, 0xeb39, 0xefd8, 0xe81a, 0xea05, 0xe80b,
      0xea19, 0xf10a, 0xe9f4, 0xf720, 0xeb9b, 0xf1e1, 0xe0ca, 0xe87a,
      0xe746, 0xe244, 0xe0e6, 0xe3af, 0xe8f9, 0xea26,
    ];
    for (const cp of glyphs) {
      const supported = await page.evaluate((codePoint) => {
        return document.fonts.check(
          "16px materialSymbols",
          String.fromCodePoint(codePoint),
        );
      }, cp);
      expect(supported, `glyph U+${cp.toString(16)} is in the subset font`).toBe(
        true,
      );
    }

    // The floating cloud icon should paint as ONE measured glyph (~its font
    // size), not as a fallback string of letters.
    const cloud = await page.locator(".codent-float-cloud").evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(el).fontSize);
      return { width: rect.width, size, text: el.textContent ?? "" };
    });
    expect(cloud.text.length).toBe(1);
    expect(cloud.width).toBeLessThan(cloud.size * 1.5);
  });
});