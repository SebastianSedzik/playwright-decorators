import playwright, { expect } from '@playwright/test'
import { suite, test, only } from '../lib'
import { NotSuiteOrTestDecoratedMethodError } from '../lib/custom'
import { mockFn } from './__mocks__/mockFn'

playwright.describe('@only decorator', () => {
  playwright.describe('with @suite', () => {
    const called: string[] = []
    const cleanup = mockFn(playwright.describe, 'only', () =>
      called.push('playwright.describe.only()')
    )

    playwright.afterAll(() => cleanup())

    @only()
    @suite()
    class FocusedSuite {}

    // Unfortunately, we cannot call real `playwright.describe.only()` because other tests will not be run, so call needs to be mocked.
    // As the result, we can only check if mocked `playwright.describe.only` was called.
    playwright('@only decorator should run `playwright.describe.only()`', () => {
      expect(called).toEqual(['playwright.describe.only()'])
      cleanup()
    })
  })

  playwright.describe('with @test', () => {
    const called: string[] = []
    const cleanup = mockFn(playwright, 'only', (fnName, test) => {
      called.push('playwright.only()')
      test()
    })

    playwright.afterAll(() => cleanup())

    @suite()
    class FocusedSuite {
      @only()
      @test()
      async focusedTest() {
        called.push('focusedTest')
      }

      @only()
      @test()
      async focusedTest2() {
        called.push('focusedTest2')
      }

      @test()
      async test() {
        called.push('test')
      }
    }

    // Unfortunately, we cannot call real `playwright.only()` because other tests will not be run, so call needs to be mocked.
    // As the result, we can only check if mocked `playwright.only` was called.
    playwright('@only decorator should run `playwright.only()` before each decorated test', () => {
      expect(called).toEqual([
        'playwright.only()',
        'playwright.only()',
        'focusedTest',
        'focusedTest2',
        'test'
      ]) // playwright.only() is called before @only tests: focusedTest & focusedTest2, but not before test
      cleanup()
    })
  })

  playwright.describe('without @suite', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError', () => {
      try {
        @only()
        class ExampleClass {}
      } catch (e) {
        expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy()
      }
    })
  })

  playwright.describe('without @test', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError', () => {
      try {
        class ExampleClass {
          @only()
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          async exampleMethod() {}
        }
      } catch (e) {
        expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy()
      }
    })
  })
})
