import { createSuiteAndTestDecorator } from './custom'
import playwright from '@playwright/test'

/**
 * Skip @test or @suite (with optional reason).
 */
export const skip = (reason?: string) =>
  createSuiteAndTestDecorator(
    'skip',
    ({ suite }) => {
      suite.initialized(() => playwright.skip(true, reason))
    },
    ({ test }) => {
      test.beforeTest(() => playwright.skip(true, reason))
    }
  )
