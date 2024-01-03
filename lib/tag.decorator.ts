import { createSuiteAndTestDecorator } from './custom'

const tagsAsPlaywrightAnnotations = (tags: string[]): string =>
  tags.map((tag) => `@${tag}`).join(' ')
/**
 * Adds tags to `@test` or `@suite`.
 * You can later run test(s) or suite(s) with specific tag, using `npx playwright test --grep "@nameOfTag"` command.
 * For example: to run tests/suites with `x` tag, please run `npx playwright test --grep "@x"`
 */
export const tag = (tags: string[]) =>
  createSuiteAndTestDecorator(
    'tag',
    ({ suite }) => {
      suite.name = `${suite.name} ${tagsAsPlaywrightAnnotations(tags)}`
    },
    ({ test }) => {
      test.name = `${test.name} ${tagsAsPlaywrightAnnotations(tags)}`
    }
  )
