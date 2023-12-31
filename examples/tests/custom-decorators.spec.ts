import { suite, test } from "playwright-decorators";
import { withUser, withRoute } from './decorators';
import { expect } from "@playwright/test";

/**
 * This suite is an example of usage of custom decorators.
 * Suite is using `withUser` suite-decorator that provides logged-in user context for each @test in the suite.
 * Also, you can find here `withRoute` test-decorator that navigates to specific route before specific @test.
 */
@withUser({ features: ['feature-a', 'feature-b'] }) // <- usage of custom `withUser` decorator
@suite()
class AuthorizedUserSuite {
  @test()
  async shouldBeLogged({ page }) {
    // When on `/` route
    await page.goto('http://localhost:3000/')

    // Then username should be displayed
    await expect(page.getByTestId('page-title')).toHaveText(/Hello (?<userName>.*) 👋/)
  }

  @withRoute('settings') // <- usage of custom `withRoute` decorator
  @test()
  async shouldHaveRequestedFeatures({ page }) {
    // When on `/settings` route
    await expect(page).toHaveURL('http://localhost:3000/settings')
    
    // Then all requested features should be available (features passed in @withUser decorator)
    await expect(page.getByTestId('settings-feature'))
      .toHaveText(['feature-a', 'feature-b']);
  }
}


@suite() // <- no `withUser` decorator, so user in @tests are not logged in
class UnauthorizedUserSuite {
  @withRoute('settings') // <- usage of custom `withRoute` decorator
  @test()
  async shouldBeRedirectedToSignInPage({ page }) {
    await expect(page).toHaveURL(/sign-in/)
  }
}
