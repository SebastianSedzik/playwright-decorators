import { test } from '@playwright/test';
interface A {
  a: string;
}

export function asd(): A {
  test('asd', () => {
    console.log('asd');
  })

  return {
    a: 'test'
  }
}
