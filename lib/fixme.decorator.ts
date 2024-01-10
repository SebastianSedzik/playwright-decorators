import { createSuiteAndTestDecorator } from './custom'
import playwright from '@playwright/test'

/**
 * Marks a @test or @suite as "fixme", with the intention to fix (with optional reason).
 * Decorated tests or suites will not be run.
 */
export const fixme = (reason?: string) =>
  createSuiteAndTestDecorator(
    'fixme',
    ({ suite }) => {
      suite.initialized(() => playwright.fixme(true, reason))
    },
    ({ test }) => {
      test.beforeTest(() => playwright.fixme(true, reason))
    }
  )
