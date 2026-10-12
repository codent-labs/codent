import { test, expect } from "@playwright/test";

// Issue #40: domain email + a real /contact form instead of a bare Gmail
// mailto. The form posts to CONTACT_API_URL when configured; otherwise it
// degrades to a prefilled mailto:hello@codentlabs.com draft.
test.describe("Contact form", () => {
  test("no visible Gmail address anywhere on the homepage or footer", async ({
    page,
  }) => {
    await page.goto("/");
    const html = await page
      .locator("body")
      .evaluate((el) => el.innerHTML);
    expect(html).not.toContain("gmail.com");
    expect(html).not.toContain("soctoit");
  });

  test("hero CTA leads to /contact; nav links resolve", async ({ page }) => {
    await page.goto("/");
    // The cookie banner sits above the hero on first visit; dismiss it so the
    // CTA underneath is clickable.
    await page.getByRole("dialog").getByRole("button", { name: "Necessary only" }).click();
    await page.getByRole("button", { name: "Start a project" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/about");
  });

  test("contact page renders the form with required fields", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page.getByText("Tell us where you're stuck.")).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.getByLabel("Work email")).toBeVisible();
    await expect(page.getByLabel("Where are you stuck?")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send the one-pager request" }),
    ).toBeVisible();
    await expect(page.getByText("hello@codentlabs.com").first()).toBeVisible();
  });

  test("invalid email shows a validation message without submitting", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Jane Founder");
    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByLabel("Where are you stuck?").fill(
      "We have a prototype that keeps dying in production and no one can tell us why.",
    );
    await page.getByRole("button", { name: "Send the one-pager request" }).click();

    await expect(
      page.getByText("Please add a valid email", { exact: false }),
    ).toBeVisible();
  });

  test("valid submission degrades to a mailto draft (no API configured)", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Jane Founder");
    await page.getByLabel("Work email").fill("jane@startup.com");
    await page.getByLabel("Where are you stuck?").fill(
      "We have a prototype that keeps dying in production and no one can tell us why.",
    );
    await page.getByLabel(/I agree that Codent Labs may store/).check();
    await page.getByRole("button", { name: "Send the one-pager request" }).click();

    await expect(page.getByRole("status")).toContainText(
      "email draft is open",
    );
  });

  // The consent box is the recorded lawful basis, so a submission without it
  // must be rejected by the server action, not just by the browser.
  // A hidden honeypot field: a real person never fills a field they cannot
  // see, so anything in it is a bot. It must not be announced to a screen
  // reader, nor reachable by keyboard.
  test("honeypot is hidden from people but present in the DOM", async ({
    page,
  }) => {
    await page.goto("/contact");
    const trap = page.locator("#company_website");
    await expect(trap).toHaveCount(1);
    await expect(trap).toHaveAttribute("tabindex", "-1");
    // aria-hidden sits on the wrapper, so assistive tech skips the whole thing.
    await expect(trap.locator("xpath=..")).toHaveAttribute("aria-hidden", "true");

    // Filling it and submitting reports success without contacting anyone,
    // which is the whole point of a honeypot.
    await trap.fill("https://spam.example");
    await page.getByLabel("Your name").fill("Bot Person");
    await page.getByLabel("Work email").fill("bot@spam.example");
    await page.getByLabel("Where are you stuck?").fill(
      "Buying backlinks for my very real consultancy website.",
    );
    await page.getByLabel(/I agree that Codent Labs may store/).check();
    await page.getByRole("button", { name: "Send the one-pager request" }).click();

    await expect(page.getByRole("status")).toContainText("within 48 hours");
  });

  test("a rejected timeline value is not accepted", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Jane Founder");
    await page.getByLabel("Work email").fill("jane@startup.com");
    await page.getByLabel("Where are you stuck?").fill(
      "We have a prototype that keeps dying in production.",
    );
    await page.getByLabel(/I agree that Codent Labs may store/).check();

    // Force an off-list value the select cannot produce on its own.
    await page.locator("#timeline").evaluate((el: HTMLSelectElement) => {
      const opt = document.createElement("option");
      opt.value = "free-money-lol";
      opt.textContent = "free money";
      el.appendChild(opt);
      el.value = "free-money-lol";
    });
    await page.getByRole("button", { name: "Send the one-pager request" }).click();
    // Scope to the form: Next's route announcer is also an alert landmark.
    await expect(page.locator("form").getByRole("alert")).toContainText(
      "timeline",
    );
  });

  test("submission without consent is rejected", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Jane Founder");
    await page.getByLabel("Work email").fill("jane@startup.com");
    await page.getByLabel("Where are you stuck?").fill(
      "We have a prototype that keeps dying in production and no one can tell us why.",
    );
    await page.getByRole("button", { name: "Send the one-pager request" }).click();

    await expect(
      page.getByText("Please tick the box", { exact: false }),
    ).toBeVisible();
  });

  test("consent checkbox starts unticked and is keyboard operable", async ({
    page,
  }) => {
    await page.goto("/contact");
    const box = page.getByLabel(/I agree that Codent Labs may store/);
    await expect(box).not.toBeChecked();

    await box.focus();
    await expect(box).toBeFocused();
    await page.keyboard.press("Space");
    await expect(box).toBeChecked();
  });

  // The banner must not steal focus on first paint: a non-blocking notice that
  // appears on load should not yank a keyboard user mid-page.
  test("the consent banner does not take focus on page load", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page.getByRole("dialog")).toBeVisible();

    const focused = await page.evaluate(
      () => document.activeElement?.tagName ?? "",
    );
    expect(focused).not.toBe("DIV");

    // Tab from the top still walks into the page (first stop is the skip
    // link) rather than landing back on the banner.
    await page.keyboard.press("Tab");
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.tagName ?? ""))
      .toBe("A");
  });

  test("registered business details are published on the contact page", async ({
    page,
  }) => {
    await page.goto("/contact");
    // Scope to the page body: the footer repeats the entity name.
    const main = page.locator("main");
    await expect(
      main.getByText("Codent Labs (sole proprietorship)"),
    ).toBeVisible();
    await expect(
      main.getByText("A-220, First Floor, Double Storey"),
    ).toBeVisible();
    await expect(main.getByText("Kalkaji, New Delhi 110019")).toBeVisible();
  });
});