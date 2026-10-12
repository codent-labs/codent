import { test, expect } from "@playwright/test";

/**
 * Failure-path checks. These only make sense against a deliberately failing
 * provider stub, so they skip themselves unless RESEND_API_BASE_URL points
 * somewhere. The point is to prove the forms never tell a visitor something
 * was sent when it was not.
 */

const AGAINST_STUB = Boolean(process.env.RESEND_API_BASE_URL);

test.beforeEach(() => {
  test.skip(!AGAINST_STUB, "needs a failing provider stub");
});

test("a failing contact provider must not report success", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Jane Founder");
  await page.getByLabel("Work email").fill("jane@startup.com");
  await page.getByLabel("Where are you stuck?").fill(
    "We have a prototype that keeps dying in production.",
  );
  await page.getByLabel(/I agree that Codent Labs may store/).check();
  await page.getByRole("button", { name: "Send the one-pager request" }).click();

  // The honest outcome is the draft fallback, never the success message.
  // Scope to the form: the page's own lede also says "within 48 hours".
  const form = page.locator("form");
  await expect(form.getByRole("status")).toContainText(
    "couldn't send that automatically",
  );
  await expect(form.getByText("within 48 hours")).toHaveCount(0);
});

test("a failing newsletter provider must not claim success", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("footer").locator("form");
  await form.getByLabel("Email address").fill("jane@startup.com");
  await form.getByLabel(/Email me the newsletter/).check();
  await form.getByRole("button", { name: "Subscribe" }).click();

  await expect(form.getByRole("alert")).toBeVisible();
  await expect(form.getByRole("status")).toHaveCount(0);
  // The provider's own error text must never reach the visitor.
  await expect(form).not.toContainText("Provider exploded");
  await expect(form).not.toContainText("500");
});
