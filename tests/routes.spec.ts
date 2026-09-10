import { test, expect } from "@playwright/test";

// Issue #36: real routes instead of single-page anchors — /work, /work/<slug>,
// /services, /process, /about, all in the sitemap, with unique metadata.
const PAGES = ["/work", "/services", "/process", "/about", "/contact", "/journal"];
const CASES = ["/work/maru", "/work/folio", "/work/sundae"];

test.describe("Crawlable routes", () => {
  test("every header link resolves to a URL, not an anchor", async ({ page }) => {
    await page.goto("/");
    const navHrefs = await page
      .getByRole("navigation")
      .getByRole("link")
      .evaluateAll((links) =>
        links
          .map((a) => (a as HTMLAnchorElement).getAttribute("href"))
          .filter((href): href is string => !!href),
      );
    expect(navHrefs.length).toBeGreaterThan(0);
    for (const href of navHrefs) {
      expect(href.startsWith("#")).toBe(false);
    }
  });

  test("every footer link resolves to a URL, not an anchor", async ({ page }) => {
    await page.goto("/");
    const footerHrefs = await page
      .locator("footer")
      .getByRole("link")
      .evaluateAll((links) =>
        links
          .map((a) => (a as HTMLAnchorElement).getAttribute("href"))
          .filter((href): href is string => !!href),
      );
    expect(footerHrefs.length).toBeGreaterThan(0);
    for (const href of footerHrefs) {
      expect(href.startsWith("#")).toBe(false);
    }
  });

  test("all top-level pages return 200 with their own title", async ({
    request,
  }) => {
    const expectedTitles: Record<string, string> = {
      "/work": "Work — Codent Labs",
      "/work/maru": "Maru — Codent Labs",
      "/work/folio": "Folio — Codent Labs",
      "/work/sundae": "Sundae — Codent Labs",
      "/services": "Services — Codent Labs",
      "/process": "Process — Codent Labs",
      "/about": "About — Codent Labs",
      "/contact": "Contact — Codent Labs",
      "/journal": "Journal — Codent Labs",
    };
    for (const [path, title] of Object.entries(expectedTitles)) {
      const res = await request.get(path);
      expect(res.status(), `${path} returns 200`).toBe(200);
      const html = await res.text();
      expect(html).toContain(`<title>${title}</title>`);
    }
  });

  test("homepage showcase cards link to individual case studies", async ({
    page,
  }) => {
    await page.goto("/");
    const showcase = page.locator("#showcase");
    for (const slug of ["maru", "folio", "sundae"]) {
      await expect(
        showcase.locator(`a[href="/work/${slug}"]`),
      ).toHaveCount(1);
    }
    await expect(
      showcase.getByRole("link", { name: /All case studies/ }),
    ).toHaveAttribute("href", "/work");
  });

  test("sitemap lists every route and journal post", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of [...PAGES, "/", ...CASES]) {
      expect(xml).toContain(`https://www.codentlabs.com${path}`);
    }
  });

  test("each page has a unique canonical URL", async ({ request }) => {
    const canonicals: string[] = [];
    for (const path of ["/", ...PAGES, ...CASES]) {
      const html = await (await request.get(path)).text();
      const match = html.match(
        /<link rel="canonical" href="([^"]+)"\/?>/,
      );
      expect(match, `${path} has a canonical`).not.toBeNull();
      canonicals.push(match![1]);
    }
    expect(new Set(canonicals).size).toBe(canonicals.length);
  });
});