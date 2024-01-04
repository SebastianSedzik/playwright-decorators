import { createSuiteAndTestDecorator } from './custom'
import playwright from '@playwright/test'

const playwrightPreviewPreset = () => {
  // disable timeout, as all operations are slowed down by 1000ms
  playwright.describe.configure({ timeout: 0 })

  playwright.use({
    // enable headed mode
    headless: false,
    launchOptions: {
      // slow down every operation by 1000ms
      slowMo: 1000
    }
  })
}

/**
 * Runs a @test(s) or @suite(s) in preview (headed browser) mode, simulating user interaction (slowing down each operation by 1000ms).
 * Tests or suites without the @preview decorator will not be excluded.
 */
export const preview = () =>
  createSuiteAndTestDecorator(
    'preview',
    ({ suite }) => {
      playwrightPreviewPreset()
      suite.only = true
    },
    ({ test }) => {
      playwrightPreviewPreset()
      test.only = true
    }
  )
