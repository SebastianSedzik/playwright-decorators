import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Skip @test or @suite (with optional reason).
 */
export const skip = (reason?: string) => function(originalMethod: any, context?: any) {
  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.skip = reason || true;
    return;
  }
  
  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.skip = reason || true;
    return;
  }
}
