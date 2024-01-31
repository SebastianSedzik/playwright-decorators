import { suite, test, retries, TestInfo } from '../lib'
import playwright, { expect } from '@playwright/test'

playwright.describe('@retries decorator', () => {
  @retries(3)
  @suite()
  class RetriesSuite {
    @test()
    // eslint-disable-next-line no-empty-pattern
    'Should retry test 3 times'({}, testInfo: TestInfo) {
      expect(testInfo.retry + 1).toEqual(3)
    }
  }
})
