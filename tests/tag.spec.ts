import playwright, { expect, TestInfo } from '@playwright/test'
import { NotSuiteOrTestDecoratedMethodError, suite, tag, test, TestArgs } from '../lib'

playwright.describe('@tag decorator', () => {
  playwright.describe('with @suite', () => {
    const titlePath: string[] = []

    @tag(['x'])
    @suite()
    class SuiteWithTag {
      @test()
      // eslint-disable-next-line no-empty-pattern
      async test({}: TestArgs, testInfo: TestInfo) {
        titlePath.push(...testInfo.titlePath)
      }
    }

    playwright('should add @x tag to suite name', () => {
      expect(titlePath.join('->')).toContain('SuiteWithTag')
      expect(titlePath.join('->')).toContain('@x')
    })
  })

  playwright.describe('with @test', () => {
    const titlePath: string[] = []

    @suite()
    class TestSuite {
      @tag(['x'])
      @test()
      // eslint-disable-next-line no-empty-pattern
      async testWithTag({}: TestArgs, testInfo: TestInfo) {
        titlePath.push(...testInfo.titlePath)
      }
    }

    playwright('should add @x tag to test name', () => {
      expect(titlePath.join('->')).toContain('testWithTag')
      expect(titlePath.join('->')).toContain('@x')
    })
  })

  playwright.describe('without @suite', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError error', () => {
      try {
        @tag(['x'])
        class ExampleClass {}
      } catch (e) {
        playwright.expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy()
      }
    })
  })

  playwright.describe('without @test', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError error', () => {
      try {
        class ExampleClass {
          @tag(['x'])
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          exampleMethod() {}
        }
      } catch (e) {
        playwright.expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy()
      }
    })
  })
})
