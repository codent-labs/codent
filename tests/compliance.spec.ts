import { test, expect } from "@playwright/test";

const LEGAL_ROUTES = [
  { path: "/privacy", heading: "Privacy" },
  { path: "/cookies", heading: "Cookie" },
  { path: "/terms", heading: "Terms of" },
  { path: "/refund-policy", heading: "Refund" },
] as const;

test.describe("Legal pages", () => {
  for (const route of LEGAL_ROUTES) {
    test(`${route.path} renders with an h1 and a last-updated date`, async ({
      page,
    }) => {
      const res = await page.goto(route.path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("Last updated")).toBeVisible();
    });

    test(`${route.path} is listed in the footer legal nav`, async ({ page }) => {
      await page.goto("/");
      const legal = page.getByRole("navigation", { name: "Legal" });
      await expect(legal).toBeVisible();
      await expect(legal.getByRole("link")).toHaveCount(5);
    });
  }

  test("footer publishes the registered entity and postal address", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(
      footer.getByText("Codent Labs (sole proprietorship)"),
    ).toBeVisible();
    await expect(
      footer.getByText("A-220, First Floor, Double Storey, Kalkaji, New Delhi, 110019, India"),
    ).toBeVisible();
    await expect(footer.getByText("grievances@codentlabs.com")).toBeVisible();
  });

  test("sitemap includes all four policy URLs", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const route of LEGAL_ROUTES) {
      expect(body).toContain(`www.codentlabs.com${route.path}`);
    }
  });

  test("policies name the applicable Indian laws", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByText(/Digital Personal Data Protection Act 2023/).first(),
    ).toBeVisible();

    await page.goto("/terms");
    await expect(
      page.getByText(/Consumer Protection Act 2019/).first(),
    ).toBeVisible();
    await expect(page.getByText(/laws of India/).first()).toBeVisible();

    await page.goto("/refund-policy");
    await expect(
      page.getByText(/Consumer Protection Act 2019/).first(),
    ).toBeVisible();

    await page.goto("/cookies");
    await expect(page.getByText(/IT Act 2000/).first()).toBeVisible();
  });
});

test.describe("Cookie consent", () => {
  test("banner appears for a first-time visitor and can be dismissed", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog");
    await expect(banner).toBeVisible();
    await expect(banner.getByText("Cookies, briefly")).toBeVisible();

    await banner.getByRole("button", { name: "Necessary only" }).click();
    await expect(banner).toBeHidden();
  });

  test("choice persists across a reload and the banner stays dismissed", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Necessary only" })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();

    await page.reload();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("consent is revocable from every page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Necessary only" })
      .click();

    const trigger = page.getByRole("button", { name: "Cookie choices" });
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("Escape declines analytics without needing a pointer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("codent.consent.v1"),
    );
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored ?? "{}").analytics).toBe("denied");
  });

  test("the banner links to the cookie policy", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog");
    await banner.getByRole("link", { name: "Read the cookie policy" }).click();
    await expect(page).toHaveURL(/\/cookies$/);
  });
});

test.describe("Tracking and third-party embeds", () => {
  test("no analytics script is requested before consent", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (req) => requests.push(req.url()));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(requests.filter((u) => u.includes("/_vercel/insights"))).toHaveLength(0);
  });

  test("no analytics script is requested after declining", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Necessary only" })
      .click();

    const requests: string[] = [];
    page.on("request", (req) => requests.push(req.url()));
    await page.reload();
    await page.waitForLoadState("networkidle");

    expect(requests.filter((u) => u.includes("/_vercel/insights"))).toHaveLength(0);
  });

  test("the site embeds no third-party iframes or remote scripts", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Necessary only" })
      .click();

    expect(await page.locator("iframe").count()).toBe(0);

    const remote = await page.evaluate(() =>
      Array.from(document.querySelectorAll("script[src]"))
        .map((s) => (s as HTMLScriptElement).src)
        .filter((src) => src && !src.startsWith(location.origin)),
    );
    expect(remote).toEqual([]);
  });
});

test.describe("Organisation structured data", () => {
  test("publishes the real entity and no fabricated review rating", async ({
    page,
  }) => {
    await page.goto("/");
    const raw = await page.evaluate(() => {
      const node = document.querySelector('script[type="application/ld+json"]');
      return node?.textContent ?? "";
    });

    const data = JSON.parse(raw);
    expect(data["@type"]).toBe("Organization");
    expect(data.legalName).toBe("Codent Labs (sole proprietorship)");
    expect(data.address.postalCode).toBe("110019");
    expect(data.contactPoint.email).toBe("grievances@codentlabs.com");

    // The previous 4.9/86 aggregateRating was derived from project counts,
    // not reviews. It must not come back without attributable published reviews.
    expect(data.aggregateRating).toBeUndefined();
  });
});
