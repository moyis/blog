import { expect, test } from "@playwright/test";

test("should display 404 page for non-existent route", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(
    page.getByRole("heading", { name: "404: Page not found" }),
  ).toBeVisible();
});

test("should have a link back to the home page", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  const homeLink = page.getByRole("link", { name: "Go to home page" });
  await expect(homeLink).toBeVisible();
  await homeLink.click();
  await expect(page).toHaveURL("/");
});
