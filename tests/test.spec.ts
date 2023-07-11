import playwright, {expect} from "@playwright/test";
import {suite, test} from "../lib";

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
  }

  playwright('Methods with @test should be run', () => {
    expect(called).toEqual(expect.arrayContaining(['testMethod', 'testMethod2', 'testThisContext']));
  });
  
  playwright('Methods without @test should not be run', () => {
    expect(called).toEqual(expect.not.arrayContaining(['notTestMethod']));
  });
})
