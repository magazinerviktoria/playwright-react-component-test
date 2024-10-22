import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://todomvc.com/examples/react/dist/#/");
    });

  test("should have correct metadata and elements", async ({page}) => {
    await expect(page).toHaveTitle("TodoMVC: React");
    await expect(
        page.getByRole("heading", {
          name: "todos",
        })
    ).toBeVisible();
    await expect(page.getByPlaceholder("What needs to be done?")).toBeVisible();
  });

    test("should have empty items list on start", async ({page}) => {
      await expect (page.getByTestId("text-input")).toBeEmpty();
    });

    test("should add item to list", async ({page}) => {
        const input = page.getByPlaceholder("What needs to be done?");

        await input.fill("Item 1");

        await input.press('Enter');

        const item = page.getByTestId("todo-item-label").nth(0);

        await expect(item).toHaveText("Item 1");
        await expect(input).toBeEmpty();
});
});

