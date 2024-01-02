import { isSuiteDecoratedMethod } from './suite.decorator'
import { isTestDecoratedMethod } from './test.decorator'
import { NotSuiteOrTestDecoratedMethodError } from './errors'
import { TestClass, TestMethod } from './common'

/**
 * Declares a focused test.
 * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
 */
export const only = () =>
  function (
    originalMethod: TestClass | TestMethod,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ClassDecoratorContext | ClassMethodDecoratorContext
  ) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      originalMethod.suiteDecorator.only = true
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      originalMethod.testDecorator.only = true
      return
    }

    throw new NotSuiteOrTestDecoratedMethodError('only', originalMethod)
  }
