import playwright, {expect} from "@playwright/test";
import {suite, test, slow, beforeAll, skip} from "../lib";

playwright.describe('@skip decorator', () => {
  playwright.describe('with @suite', () => {
    const called: string[] = [];

    @skip()
    @suite()
    class SkipSuite {
      @test()
      async test() {
        called.push('test');
      }
      
      @test()
      async test2() {
        called.push('test2');
      }
    }
    
    playwright('@skip decorator should not call any @test methods from suite', () => {
      expect(called).toEqual([]);
    });
  });
  
  playwright.describe('with @test', () => {
    const called: string[] = [];

    @suite()
    class TestSuite {
      @test()
      async test() {
        called.push('test');
      }
      
      @skip()
      @test()
      async skippedTest() {
        called.push('skippedTest');
      }
      
      @test()
      async test2() {
        called.push('test2');
      }
    }
    
    playwright('@skip decorator should not execute @test method', () => {
      expect(called).not.toContain('skippedTest');
    })
  });
});
