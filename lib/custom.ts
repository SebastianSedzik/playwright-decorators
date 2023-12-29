import {isSuiteDecoratedMethod, SuiteDecorator} from "./suite.decorator";
import {isTestDecoratedMethod, TestDecorator} from "./test.decorator";
import {NotSuiteDecoratedMethodError, NotTestDecoratedMethodError} from "./errors";

type CustomSuiteDecorator = (params: { suite: SuiteDecorator, context?: ClassMethodDecoratorContext }) => void;

/**
 * Generates a decorator specifically intended for use with the @suite.
 * Applying this decorator in other contexts will result in an error.
 * @param name name of the decorator
 * @param suiteDecorator a custom decorator function
 */
export const createSuiteDecorator = (name: string, suiteDecorator: CustomSuiteDecorator) => {
  return function(originalMethod: any, context?: any) {
    if (!isSuiteDecoratedMethod(originalMethod)) {
      throw new NotSuiteDecoratedMethodError(name, originalMethod);
    }
    
    originalMethod.suiteDecorator.initialized(() => {
      suiteDecorator({
        suite: originalMethod.suiteDecorator,
        context
      });
    })
  }
}

type CustomTestDecorator = (params: { test: TestDecorator, context?: any }) => void;

/**
 * Generates a decorator specifically intended for use with the @test.
 * Applying this decorator in other contexts will result in an error.
 * @param name name of the decorator
 * @param testDecorator a custom decorator function
 */
export const createTestDecorator = (name: string, testDecorator: CustomTestDecorator) => {
  return function(originalMethod: any, context?: any) {
    if (!isTestDecoratedMethod(originalMethod)) {
      throw new NotTestDecoratedMethodError(name, originalMethod);
    }

    testDecorator({
      test: originalMethod.testDecorator,
      context
    })
  }
}
