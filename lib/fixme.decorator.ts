import { isSuiteDecoratedMethod } from './suite.decorator'
import { isTestDecoratedMethod } from './test.decorator'
import { NotSuiteOrTestDecoratedMethodError } from './errors'
import { TestClass, TestMethod } from './common'

/**
 * Marks a @test or @suite as "fixme", with the intention to fix (with optional reason).
 * Decorated tests or suites will not be run.
 */
export const fixme = (reason?: string) =>
  function (
    originalMethod: TestClass | TestMethod,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassDecoratorContext | ClassMethodDecoratorContext
  ) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      originalMethod.suiteDecorator.fixme = reason || true
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      originalMethod.testDecorator.fixme = reason || true
      return
    }

    throw new NotSuiteOrTestDecoratedMethodError('fixme', originalMethod)
  }
