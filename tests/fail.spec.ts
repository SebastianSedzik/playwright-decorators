import playwright, {expect} from "@playwright/test";
import {suite, test, fail, NotSuiteOrTestDecoratedMethodError} from "../lib";

playwright.describe('@fail decorator', () => {
  playwright.describe('with @suite', () => {
    const called: string[] = [];
    
    @fail()
    @suite()
    class SkipSuite {
      @test()
      async test() {
        called.push('test');
        expect(true).toBe(false);
      }

      @test()
      async test2() {
        called.push('test2');
        expect(true).toBe(false);
      }
    }
    
    playwright('@fail decorator should not throw error when tests intentionally fails', () => {
      expect(called).toEqual(['test', 'test2']);
    });
  });
  
  playwright.describe('with @test', () => {
    const called: string[] = [];
    
    @suite()
    class FocusedSuite {
      @fail()
      @test()
      failingTest() {
        called.push('failingTest');
        expect(true).toBe(false);
      }
    }

    playwright('@fail decorator should not throw error when test intentionally fails', () => {
      // is called and not throw error
      expect(called).toEqual(['failingTest']);
    });
  });
  
  playwright.describe('without @suite', () => {
    playwright('should throw NotSuiteOrTestDecoratedMethodError error', () => {
      try {
        @fail()
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
          @fail()
          exampleMethod() {}
        }
      } catch (e) {
        playwright.expect(e instanceof NotSuiteOrTestDecoratedMethodError).toBeTruthy();
      }
    });
  });
});
