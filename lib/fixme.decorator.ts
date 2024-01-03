import { createSuiteAndTestDecorator } from './custom'

/**
 * Marks a @test or @suite as "fixme", with the intention to fix (with optional reason).
 * Decorated tests or suites will not be run.
 */
export const fixme = (reason?: string) =>
  createSuiteAndTestDecorator(
    'fixme',
    ({ suite }) => {
      suite.fixme = reason || true
    },
    ({ test }) => {
      test.fixme = reason || true
    }
  )
