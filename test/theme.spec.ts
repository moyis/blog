import { expect, test } from "@playwright/test";

test.describe("Theme persistence", () => {
  test("dark theme persists across navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot("home-dark-theme.png");
    await page.getByRole("link", { name: "experience" }).click();
    await expect(page).toHaveURL("/experience");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot("experience-dark-theme.png");
  });

  test("dark theme persists after page reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot("home-dark-after-reload.png");
  });

  test("light theme persists across navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await page.getByRole("button", { name: "Light theme" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await page.getByRole("link", { name: "experience" }).click();
    await expect(page).toHaveURL("/experience");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page).toHaveScreenshot("experience-light-theme.png");
  });
});
