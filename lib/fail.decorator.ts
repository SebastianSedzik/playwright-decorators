import { createSuiteAndTestDecorator } from './custom'
import playwright from '@playwright/test'

/**
 * Marks a @test or @suite as "should fail".
 * Playwright Test runs this test and ensures that it is actually failing.
 * This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.
 */
export const fail = (reason?: string) =>
  createSuiteAndTestDecorator(
    'fail',
    ({ suite }) => {
      suite.initialized(() => playwright.fail(true, reason))
    },
    ({ test }) => {
      test.beforeTest(() => playwright.fail(true, reason))
    }
  )
