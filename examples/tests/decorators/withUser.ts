import playwright from '@playwright/test'
import { createSuiteDecorator } from 'playwright-decorators'

/**
 * Provide context of logged-in user for each @test in the given @suite.
 * Please use it with `@suite` decorator.
 */
export const withUser = (options: { features: string[] }) =>
  createSuiteDecorator('withUser', () => {
    let testUser: { email: string; password: string }

    // #1 Get test user credentials before all tests
    playwright.beforeAll(async () => {
      const testUserPayload = { features: options.features }

      // #2 Send request to create a new test user
      const testUserData = await fetch('http://localhost:3000/create-user', {
        method: 'POST',
        body: JSON.stringify(testUserPayload),
        headers: { 'Content-Type': 'application/json' }
      })

      // #3 Keep credentials of test user
      testUser = await testUserData.json()
    })

    // #4 Login with test user credentials before each test
    playwright.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/sign-in')
      await page.getByTestId('sign-in-email').fill(testUser.email)
      await page.getByTestId('sign-in-password').fill(testUser.password)
      await page.getByTestId('sign-in-submit').click()
    })
  })
