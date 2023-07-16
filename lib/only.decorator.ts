import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Declares a focused test.
 * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
 */
export const only = () => function(originalMethod: any, context?: any) {
  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.only = true;
    return;
  }

  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.only = true;
    return;
  }
}
