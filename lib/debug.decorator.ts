import { createSuiteAndTestDecorator } from './custom'

/**
 * Runs a @test or @suite in debug mode.
 * Tests or suites without the @debug decorator will not be excluded.
 * Learn more about debug mode: https://playwright.dev/docs/debug
 */
export const debug = () =>
  createSuiteAndTestDecorator(
    'debug',
    ({ suite }) => {
      process.env.PWDEBUG = '1'
      suite.only = true
    },
    ({ test }) => {
      process.env.PWDEBUG = '1'
      test.only = true
    }
  )
