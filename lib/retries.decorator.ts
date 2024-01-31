import playwright from '@playwright/test'
import { createSuiteDecorator } from '../lib'

/**
 * Set the maximum number of retry attempts given to failed @tests in the @suite
 * @param retries the number of retries for each @test.
 */
export const retries = (retries: number) =>
  createSuiteDecorator('retry', ({ suite }) => {
    suite.initialized(() => {
      playwright.describe.configure({ retries })
    })
  })
