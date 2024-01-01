import { createTestDecorator } from "playwright-decorators";
import playwright, {Page} from "@playwright/test";

/**
 * Navigate to specific route before given @test.
 * Please use it with `@test` decorator.
 * @param url
 */
export const withRoute = (url: string) => createTestDecorator('withRoute', ({ test }) => {
  let _page: Page;

  // #1 Extract `page` from test context
  playwright.beforeEach(({ page }) => {
    _page = page;
  })
  
  // #2 Go to specific route before test
  test.beforeTest(async () => {
    await _page.goto(`http://localhost:3000/${url}`);
  });
})
