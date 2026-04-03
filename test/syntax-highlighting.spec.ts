import { expect, test } from "@playwright/test";

test.describe("Syntax highlighting", () => {
  test("code blocks have syntax highlighting on blog post", async ({
    page,
  }) => {
    await page.goto("/blog/feature-envy/");
    const codeBlocks = page.locator("pre code");
    await expect(codeBlocks.first()).toBeVisible();
    const tokens = page.locator("pre code .token");
    expect(await tokens.count()).toBeGreaterThan(0);
  });

  test("keyword tokens are present in Java code blocks", async ({ page }) => {
    await page.goto("/blog/feature-envy/");
    const keywords = page.locator("pre code .token.keyword");
    expect(await keywords.count()).toBeGreaterThan(0);
  });

  test("code block has correct dark theme colors", async ({ page }) => {
    await page.goto("/blog/feature-envy/");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    const codeBlocks = page.locator("pre code");
    await expect(codeBlocks.first()).toBeVisible();
    const tokens = page.locator("pre code .token");
    expect(await tokens.count()).toBeGreaterThan(0);
  });
});
