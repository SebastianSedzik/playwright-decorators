import { suite } from '../lib';
import playwright, {expect} from '@playwright/test';

playwright.describe('@suite decorator', () => {
  let withSuiteDecoratorRun = false;
  let withoutSuiteDecoratorRun = false;

  @suite()
  class WithSuiteDecorator {
    constructor() {
      withSuiteDecoratorRun = true;
    }
  }

  class WithoutSuiteDecorator {
    constructor() {
      withoutSuiteDecoratorRun = true;
    }
  }
  
  playwright('Class with @suite should be initialized', () => {
    expect(withSuiteDecoratorRun).toBeTruthy();
  });

  playwright('Class without @suite should not be initialized', () => {
    expect(withoutSuiteDecoratorRun).toBeFalsy();
  });
})
