import { suite, test, retry, TestInfo } from '../lib'
import playwright, { expect } from '@playwright/test'

playwright.describe('@skip decorator', () => {
  @retry(3)
  @suite()
  class RetrySuite {
    @test()
    // eslint-disable-next-line no-empty-pattern
    'Should retry test 3 times'({}, testInfo: TestInfo) {
      expect(testInfo.retry + 1).toEqual(3)
    }
  }
})
