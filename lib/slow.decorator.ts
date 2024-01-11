import { createSuiteAndTestDecorator } from './custom'
import playwright from '@playwright/test'

/**
 * Marks a @test or @suite as "slow" (with optional reason).
 * Slow test will be given triple the default timeout.
 */
export const slow = (reason?: string) =>
  createSuiteAndTestDecorator(
    'slow',
    ({ suite }) => {
      suite.initialized(() => playwright.slow(true, reason))
    },
    ({ test }) => {
      test.beforeTest(() => playwright.slow(true, reason))
    }
  )
