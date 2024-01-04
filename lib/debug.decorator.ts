import { createSuiteAndTestDecorator } from './custom'

/**
 * Runs a @test or @suite in debug mode.
 * @test(s) or @suite(s) lacking the @debug decorator will be excluded.
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
