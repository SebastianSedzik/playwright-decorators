import playwright, {expect} from "@playwright/test";
import {mockFn} from "./__mocks__/mockFn";
import {suite, tag, test} from "../lib";

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
});
