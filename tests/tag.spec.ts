import playwright, {expect} from "@playwright/test";
import {mockFn} from "./__mocks__/mockFn";
import {fail, NotSuiteOrTestDecoratedMethodError, suite, tag, test} from "../lib";

playwright.describe('@tag decorator', () => {
  playwright.describe('with @suite', () => {
    const titlePath: string[] = [];

    @tag(['x'])
    @suite()
    class SuiteWithTag {
      @test()
      async test({}, testInfo) {
        titlePath.push(...testInfo.titlePath);
      }
    }

    playwright('should add @x tag to suite name', () => {
      expect(titlePath.join('->')).toContain('SuiteWithTag');
      expect(titlePath.join('->')).toContain('@x');
    });
  })
  
  playwright.describe('with @test', () => {
    const titlePath: string[] = [];

    @suite()
    class TestSuite {
      @tag(['x'])
      @test()
      async testWithTag({}, testInfo) {
        titlePath.push(...testInfo.titlePath);
      }
    }

    playwright('should add @x tag to test name', () => {
      expect(titlePath.join('->')).toContain('testWithTag');
      expect(titlePath.join('->')).toContain('@x');
    });
  });
  
  playwright.describe('without @suite', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError error', () => {
      try {
        @tag(['x'])
        class ExampleClass {}
      } catch (e) {
        playwright.expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy();
      }
    });
  });
  
  playwright.describe('without @test', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError error', () => {
      try {
        class ExampleClass {
          @tag(['x'])
          exampleMethod() {}
        }
      } catch (e) {
        playwright.expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy();
      }
    });
  });
});
