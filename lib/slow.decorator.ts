import { isSuiteDecoratedMethod } from './suite.decorator'
import { isTestDecoratedMethod } from './test.decorator'
import { NotSuiteOrTestDecoratedMethodError } from './errors'
import { TestClass, TestMethod } from './common'

/**
 * Marks a @test or @suite as "slow" (with optional reason).
 * Slow test will be given triple the default timeout.
 */
export const slow = (reason?: string) =>
  function (
    originalMethod: TestClass | TestMethod,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassDecoratorContext | ClassMethodDecoratorContext
  ) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      originalMethod.suiteDecorator.slow = reason || true
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      originalMethod.testDecorator.slow = reason || true
      return
    }

    throw new NotSuiteOrTestDecoratedMethodError('slow', originalMethod)
  }
