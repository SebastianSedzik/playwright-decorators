import {skip, suite, test} from '../lib';
import playwright, {expect} from '@playwright/test';

playwright.describe('@suite decorator', () => {
  playwright.describe('Class with @suite should be initialized', () => {
    const called: string[] = [];
    
    @suite()
    class WithSuiteDecorator {
      constructor() {
        called.push('constructor');
      }
    }

    expect(called).toContain('constructor');
  });

  playwright('Class without @suite should not be initialized', () => {
    const called: string[] = [];
    
    class WithoutSuiteDecorator {
      constructor() {
        called.push('constructor');
      }
    }
    
    expect(called).not.toContain('constructor');
  });

  playwright.describe('Class with @suite & @skip should not run any tests', () => {
    const called: string[] = [];

    @skip()
    @suite()
    class WithSuiteDecorator {
      @test()
      testMethod() {
        called.push('testMethod');
      }
    }

    expect(called).not.toContain(['testMethod']);
  });
})
