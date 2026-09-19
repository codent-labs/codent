import { test, expect } from "@playwright/test";

// Issue #38: a journal with real routes, valid RSS, Article structured data
// per post, and a newsletter capture in the footer.
const POST_SLUGS = [
  "how-we-scope-a-prototype-in-23-days",
  "the-hand-off-doc-your-devs-wont-cry-over",
  "why-we-quote-six-weeks-for-brand-work",
  "what-100-percent-of-clients-return-means",
];

test.describe("Journal", () => {
  test("navbar and footer link to the journal", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Journal" }),
    ).toHaveAttribute("href", "/journal");
    await expect(page.locator("footer").getByRole("link", { name: "Journal" })).toHaveAttribute(
      "href",
      "/journal",
    );
  });

  test("/journal lists at least three published posts", async ({ page }) => {
    await page.goto("/journal");
    await expect(
      page.getByRole("heading", { name: "Notes from the lab." }),
    ).toBeVisible();
    for (const slug of POST_SLUGS) {
      await expect(page.locator(`a[href="/journal/${slug}"]`)).toHaveCount(1);
    }
  });

  test("each post renders with content and structured data", async ({ page }) => {
    await page.goto(`/journal/${POST_SLUGS[0]}`);
    await expect(page.getByRole("article")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const jsonLd = await page.evaluate(() => {
      const scripts = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      );
      return scripts
        .map((s) => JSON.parse(s.textContent ?? "{}"))
        .find((j) => j["@type"] === "Article");
    });
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.headline.length).toBeGreaterThan(0);
    expect(jsonLd.datePublished).toBeTruthy();
  });

  test("feed.xml returns valid RSS with all posts", async ({ request }) => {
    const res = await request.get("/feed.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/rss+xml");

    const body = await res.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain("<rss version=\"2.0\">");
    expect(body).toContain("<channel>");
    for (const slug of POST_SLUGS) {
      expect(body).toContain(`/journal/${slug}`);
    }
    // Every item closes cleanly.
    const itemCount = (body.match(/<item>/g) ?? []).length;
    const closeCount = (body.match(/<\/item>/g) ?? []).length;
    expect(itemCount).toBe(POST_SLUGS.length);
    expect(closeCount).toBe(itemCount);
  });

  test("newsletter capture renders in the footer", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("footer").locator("form");
    await expect(form).toBeVisible();
    await expect(form.getByLabel("Email address")).toBeVisible();
    await expect(form.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });

  test("newsletter shows a graceful note when no provider is configured", async ({
    page,
  }) => {
    await page.goto("/");
    const form = page.locator("footer").locator("form");
    await form.getByLabel("Email address").fill("jane@startup.com");
    await form.getByRole("button", { name: "Subscribe" }).click();
    await expect(form.getByRole("status")).toContainText("isn't connected");
  });
});