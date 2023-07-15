import playwright, {expect} from "@playwright/test";
import {skip, suite, test} from "../lib";

playwright.describe('@test decorator', () => {
  const called: string[] = [];
  
  @suite()
  class ExampleSuite {
    @test()
    testMethod() {
      called.push('testMethod');
    }

    @test()
    testMethod2() {
      called.push('testMethod2');
    }

    notTestMethod() {
      called.push('notTestMethod');
    }

    @test()
    testThisContext() {
      called.push('testThisContext');
      expect(this instanceof ExampleSuite).toBeTruthy();
    }

    @test()
    testShouldHaveAccessToPage({ page }) {
      called.push('testShouldHaveAccessToPage');
      expect(page).not.toBeUndefined();
    }
  }

  playwright('Methods with @test should be run', () => {
    expect(called).toEqual(['testMethod', 'testMethod2', 'testThisContext', 'testShouldHaveAccessToPage']);
  });

  playwright('Methods without @test should not be run', () => {
    expect(called).toEqual(expect.not.arrayContaining(['notTestMethod']));
  });
  
  playwright.afterAll(() => {
    expect(called.length).toEqual(4);
  })

  playwright.describe('with @skip', () => {
    const called: string[] = [];

    @suite()
    class withSkipSuite {
      @test()
      test() {
        called.push('test')
      }
      
      @skip()
      @test()
      skippedTest() {
        called.push('skippedTest')
      }
    }
    
    playwright('should not run skipped tests', () => {
      expect(called).toContain('test');
      expect(called).not.toContain('skippedTest');
    })
  })
})
