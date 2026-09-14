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

  test("hero and navbar lead to the /contact route", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Start a project" })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
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
    await page.getByRole("button", { name: "Send the one-pager request" }).click();

    await expect(page.getByRole("status")).toContainText(
      "email draft is open",
    );
  });
});