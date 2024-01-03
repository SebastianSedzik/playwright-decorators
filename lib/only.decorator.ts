import { createSuiteAndTestDecorator } from './custom'

/**
 * Declares a focused test.
 * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
 */
export const only = () =>
  createSuiteAndTestDecorator(
    'only',
    ({ suite }) => {
      suite.only = true
    },
    ({ test }) => {
      test.only = true
    }
  )
