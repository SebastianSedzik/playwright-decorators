import { isSuiteDecoratedMethod, SuiteDecorator } from './suite.decorator'
import { isTestDecoratedMethod, TestDecorator } from './test.decorator'
import { TestClass, TestMethod } from './common'

export class NotSuiteDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: TestClass) {
    super(`
The @${decoratorName} decorator can only be used on class that also have the @suite decorator.
Make sure ${method?.name} is marked with @suite, and that ${decoratorName} comes before @suite, like this:

@${decoratorName}
@suite()
${method?.name}() {}`)
  }
}

export class NotTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: TestMethod) {
    super(`
The @${decoratorName} decorator can only be used on methods that also have the @test decorator.
Make sure ${method?.name} is marked with @test, and that ${decoratorName} comes before @test, like this:

@${decoratorName}
@test()
${method?.name}() {}`)
  }
}

export class NotSuiteOrTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: TestClass | TestMethod) {
    super(`
The @${decoratorName} decorator can only be used on classes/methods that also have the @suite or @test decorator.
Make sure ${method?.name} is marked with @suite or @test, and that ${decoratorName} comes before @suite or @test, like this:

@${decoratorName}
@suite() / @test()
${method?.name}() {}
    `)
  }
}

type CustomSuiteDecorator = (params: {
  /**
   * @suite decorator context
   */
  suite: SuiteDecorator
  /**
   * The suite class that is being decorated.
   */
  suiteClass: TestClass
  /**
   * The context of the suite class that is being decorated.
   */
  context: ClassDecoratorContext
}) => void

/**
 * Generates a decorator specifically intended for use with the @suite.
 * Applying this decorator in other contexts will result in an error.
 * @param name name of the decorator
 * @param suiteDecorator a custom decorator function
 */
export const createSuiteDecorator = (name: string, suiteDecorator: CustomSuiteDecorator) => {
  return function (suiteClass: TestClass, context: ClassDecoratorContext) {
    if (!isSuiteDecoratedMethod(suiteClass)) {
      throw new NotSuiteDecoratedMethodError(name, suiteClass)
    }

    suiteDecorator({
      suite: suiteClass.suiteDecorator,
      suiteClass: suiteClass,
      context
    })
  }
}

type CustomTestDecorator = (params: {
  /**
   * @test decorator context
   */
  test: TestDecorator
  /**
   * The test method that is being decorated.
   */
  testMethod: TestMethod
  /**
   * The context of the test method that is being decorated.
   */
  context: ClassMethodDecoratorContext
}) => void


/**
 * Generates a decorator specifically intended for use with the @test.
 * Applying this decorator in other contexts will result in an error.
 * @param name name of the decorator
 * @param testDecorator a custom decorator function
 */
export const createTestDecorator = (name: string, testDecorator: CustomTestDecorator) => {
  return function (testMethod: TestMethod, context: ClassMethodDecoratorContext) {
    if (!isTestDecoratedMethod(testMethod)) {
      throw new NotTestDecoratedMethodError(name, testMethod)
    }

    testDecorator({
      test: testMethod.testDecorator,
      testMethod,
      context
    })
  }
}

/**
 * Generates a decorator specifically intended for use with both @suite and @test.
 * @param name name of the decorator
 * @param suiteDecorator a custom decorator function intended for use with @suite
 * @param testDecorator a custom decorator function intended for use with @test
 */
export const createSuiteAndTestDecorator = (name: string, suiteDecorator: CustomSuiteDecorator, testDecorator: CustomTestDecorator) => {
  return function (originalMethod: TestClass | TestMethod, context: ClassDecoratorContext | ClassMethodDecoratorContext) {
    if (isSuiteDecoratedMethod(originalMethod)) {
      suiteDecorator({
        suite: originalMethod.suiteDecorator,
        suiteClass: originalMethod as TestClass,
        context: context as ClassDecoratorContext
      })
      return
    }

    if (isTestDecoratedMethod(originalMethod)) {
      testDecorator({
        test: originalMethod.testDecorator,
        testMethod: originalMethod as TestMethod,
        context: context as ClassMethodDecoratorContext
      })
      return
    }
    
    throw new NotSuiteOrTestDecoratedMethodError(name, originalMethod)
  }
}
