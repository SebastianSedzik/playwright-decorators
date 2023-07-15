import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Marks a @test or @suite as "slow" (with optional reason).
 * Slow test will be given triple the default timeout.
 */
export const slow = (reason?: string) => function(originalMethod: any, context?: any) {
  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.slow = reason || true;
    return;
  }
  
  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.slow = reason || true;
    return;
  }
}
