import { isSuiteDecoratedMethod } from './suite.decorator'
import { isTestDecoratedMethod } from './test.decorator'
import { NotSuiteOrTestDecoratedMethodError } from './errors'
import { TestClass, TestMethod } from './common'

/**
 * Skip @test or @suite (with optional reason).
 */
export const skip = (reason?: string) =>
  function (
    originalMethod: TestClass | TestMethod,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassDecoratorContext | ClassMethodDecoratorContext
  ) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      originalMethod.suiteDecorator.skip = reason || true
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      originalMethod.testDecorator.skip = reason || true
      return
    }

    throw new NotSuiteOrTestDecoratedMethodError('skip', originalMethod)
  }
