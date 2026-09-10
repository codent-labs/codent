import { test, expect } from "@playwright/test";

// Issue #37: a <details>-based FAQ accordion between Process and the final CTA
// that answers pricing, scope, timeline and team objections.
const QUESTIONS = [
  "How do we start working together?",
  "What does a project cost, roughly? Do you quote fixed hours?",
  "How long does a typical project take?",
  "What does the 48-hour one-pager include?",
  "Which industries do you work with?",
  "Who is actually on the team?",
  "What stack do you build with?",
];

test.describe("FAQ section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all seven questions", async ({ page }) => {
    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    for (const q of QUESTIONS) {
      await expect(faq.getByText(q, { exact: true })).toBeVisible();
    }
  });

  test("accordion answers are hidden until opened", async ({ page }) => {
    const faq = page.locator("#faq");
    const first = faq.locator("details").first();

    await expect(first).not.toHaveAttribute("open", "");
    const answerHidden = await first
      .locator("p")
      .evaluate((el) => (el as HTMLElement).offsetHeight === 0);
    expect(answerHidden).toBe(true);

    await first.locator("summary").click();
    await expect(first).toHaveAttribute("open", "");
    const answerVisible = await first
      .locator("p")
      .evaluate((el) => (el as HTMLElement).offsetHeight > 0);
    expect(answerVisible).toBe(true);
  });

  test("answers stay consistent with the one-pager and timeline claims", async ({
    page,
  }) => {
    const faqText = await page
      .locator("#faq")
      .evaluate((el) => el.textContent ?? "");
    expect(faqText).toContain("48 hours");
    expect(faqText).toContain("one-pager");
    expect(faqText).toContain("23 days");
    expect(faqText).toContain("6 weeks");
    expect(faqText).toContain("86+ projects");
  });
});