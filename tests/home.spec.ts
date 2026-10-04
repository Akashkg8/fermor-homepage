import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("one h1 that says what Fermor is", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Every money decision, worked out in the open.");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu button is phone-only");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: /Calculators/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(button).toBeFocused();
});

test("hero SIP calculator recomputes, and the rough work shows the same number", async ({ page, isMobile }) => {
  await page.goto("/");
  const field = page.getByRole("textbox", { name: "Monthly SIP" });
  await field.fill("10000");
  await page.getByRole("textbox", { name: "Expected return" }).fill("12");
  await page.getByRole("textbox", { name: "Time period" }).fill("10");
  await field.blur();

  if (isMobile) await page.getByRole("button", { name: "Show working" }).click();
  const working = page.getByRole("region", { name: "Working" });
  // ₹10,000 × 10 yrs × 12% → ₹23,23,391 (reference value from the unit tests).
  await expect(working).toContainText("₹23,23,391");
  await expect(working).toContainText("n = 10 × 12 = 120");
});

test("EMI tab works by keyboard", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Monthly SIP" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Home loan EMI" })).toHaveAttribute("aria-selected", "true");
  if (isMobile) await page.getByRole("button", { name: "Show working" }).click();
  // ₹50 lakh, 8.5%, 20 years.
  await expect(page.getByRole("region", { name: "Working" })).toContainText("₹43,391");
});

test("invalid input is flagged, not silently used", async ({ page }) => {
  await page.goto("/");
  const field = page.getByRole("textbox", { name: "Monthly SIP" });
  await field.fill("abc");
  await expect(field).toHaveAttribute("aria-invalid", "true");
});

test("waitlist validates and confirms", async ({ page }) => {
  await page.goto("/#app");
  await page.getByLabel("Email address").fill("reader@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Get my health check" }).last().click();
  await expect(page.getByRole("status")).toContainText("on the list");
});

test("no banned phrases on the page", async ({ page }) => {
  await page.goto("/");
  const text = (await page.locator("body").innerText()).toLowerCase();
  for (const banned of [
    "invest now",
    "guaranteed",
    "assured return",
    "best fund",
    "unlock",
    "supercharge",
    "seamless",
    "empower",
    "financial journey",
  ]) {
    expect(text, banned).not.toContain(banned);
  }
});

test("no horizontal page scroll", async ({ page }) => {
  await page.goto("/");
  // Compare with the configured viewport, not innerWidth: an emulated phone
  // zooms out to fit overflowing content, which would hide the bug.
  const width = page.viewportSize()!.width;
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(width);
});

test("axe: no WCAG 2.2 AA violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
});
