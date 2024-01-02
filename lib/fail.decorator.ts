import { isSuiteDecoratedMethod } from './suite.decorator'
import { isTestDecoratedMethod } from './test.decorator'
import { NotSuiteOrTestDecoratedMethodError } from './errors'
import { TestClass, TestMethod } from './common'

/**
 * Marks a @test or @suite as "should fail".
 * Playwright Test runs this test and ensures that it is actually failing.
 * This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.
 */
export const fail = (reason?: string) =>
  function (
    originalMethod: TestClass | TestMethod,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassDecoratorContext | ClassMethodDecoratorContext
  ) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      originalMethod.suiteDecorator.fail = reason || true
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      originalMethod.testDecorator.fail = reason || true
      return
    }

    throw new NotSuiteOrTestDecoratedMethodError('fail', originalMethod)
  }
