import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Adds tags to `@test` or `@suite`.
 * You can later run test(s) or suite(s) with specific tag, using `npx playwright test --grep "@nameOfTag"` command.
 * For example: to run tests/suites with `x` tag, please run `npx playwright test --grep "@x"`
 */
export const tag = (tags: string[]) => function(originalMethod: any, context?: any) {
  const tagsAsPlaywrightAnnotations = tags.map(tag => `@${tag}`).join(' ');

  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.name = `${originalMethod.suiteDecorator.name} ${tagsAsPlaywrightAnnotations}`;
    return;
  }

  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.name = `${originalMethod.testDecorator.name} ${tagsAsPlaywrightAnnotations}`;
    return;
  }
}
