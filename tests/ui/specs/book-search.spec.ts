import { test, expect } from "@playwright/test";

test("Search java books with 4 results", async ({ page }) => {
  await page.goto("https://demoqa.com/books");
  await page.getByPlaceholder("Type to search").click();
  await page.getByPlaceholder("Type to search").fill("java");
  await expect(page.getByRole("link").filter({ hasText: "java" })).toHaveCount(
    4
  );
  await expect(page.getByRole("link").filter({ hasText: "java" })).toHaveText([
    "Learning JavaScript Design Patterns",
    "Speaking JavaScript",
    "Programming JavaScript Applications",
    "Eloquent JavaScript, Second Edition",
  ]);
});
