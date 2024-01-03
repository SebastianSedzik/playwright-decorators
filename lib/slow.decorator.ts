import { createSuiteAndTestDecorator } from './custom'

/**
 * Marks a @test or @suite as "slow" (with optional reason).
 * Slow test will be given triple the default timeout.
 */
export const slow = (reason?: string) =>
  createSuiteAndTestDecorator(
    'slow',
    ({ suite }) => {
      suite.slow = reason || true
    },
    ({ test }) => {
      test.slow = reason || true
    }
  )
