import playwright, {expect} from "@playwright/test";
import {suite, test, slow, beforeAll, only} from "../lib";
import { mockFn } from './__mocks__/mockFn';

playwright.describe('@slow decorator', () => {
  playwright.describe('with @suite', () => {
    const called: string[] = [];
    const cleanup = mockFn(playwright, 'slow', () => called.push('playwright.slow()'));

    playwright.afterAll(() => cleanup());

    @slow()
    @suite()
    class withSlowSuite {
      @test()
      async slowTest() {
        called.push('slowTest');
      }
      
      @test()
      async slowTest2() {
        called.push('slowTest2');
      }
    }

    playwright('@slow decorator should call playwright.slow() before calling tests', () => {
      expect(called).toEqual(['playwright.slow()', 'slowTest', 'slowTest2']);
    });
  });
  
  playwright.describe('with @test', () => {
    const called: string[] = [];
    let cleanup: () => void;

    playwright.beforeAll(() => {
      cleanup = mockFn(playwright, 'slow', () => called.push('playwright.slow()'));
    });

    playwright.afterAll(() => cleanup());

    @suite()
    class withSlowTestSuite {
      @test()
      async test() {
        called.push('test');
      }
      
      @slow()
      @test()
      async slowTest() {
        called.push('slowTest');
      }

      @test()
      async test2() {
        called.push('test2');
      }
    }

    playwright('@slow decorator should call playwright.slow() before decorated test', () => {
      expect(called).toEqual(['test', 'playwright.slow()', 'slowTest', 'test2']);
    })
  });
});
