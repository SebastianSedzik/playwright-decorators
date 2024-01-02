import {isSuiteDecoratedMethod} from "./suite.decorator";
import {isTestDecoratedMethod} from "./test.decorator";
import {NotSuiteOrTestDecoratedMethodError} from "./errors";
import {TestClass, TestMethod} from "./common";

/**
 * Adds tags to `@test` or `@suite`.
 * You can later run test(s) or suite(s) with specific tag, using `npx playwright test --grep "@nameOfTag"` command.
 * For example: to run tests/suites with `x` tag, please run `npx playwright test --grep "@x"`
 */
export const tag = (tags: string[]) => function(
  originalMethod: TestClass | TestMethod,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: ClassDecoratorContext | ClassMethodDecoratorContext
) {
  const tagsAsPlaywrightAnnotations = tags.map(tag => `@${tag}`).join(' ');

  if (isSuiteDecoratedMethod(originalMethod)) {
    originalMethod.suiteDecorator.name = `${originalMethod.suiteDecorator.name} ${tagsAsPlaywrightAnnotations}`;
    return;
  }

  if (isTestDecoratedMethod(originalMethod)) {
    originalMethod.testDecorator.name = `${originalMethod.testDecorator.name} ${tagsAsPlaywrightAnnotations}`;
    return;
  }

  throw new NotSuiteOrTestDecoratedMethodError('tag', originalMethod);
}
