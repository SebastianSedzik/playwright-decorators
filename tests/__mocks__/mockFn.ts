/**
 * Mock object method.
 * Returns cleanup function to restore original method.
 * @param target - target object.
 * @param targetProperty - name of property from target object.
 * @param mock - mock function to be called instead of original one.
 */
export const mockFn = <T>(target: T, targetProperty: keyof T, mock: (...args: any[]) => void): () => void => {
  const originalFn = target[targetProperty];

  // @ts-ignore
  target[targetProperty] = mock;

  return () => {
    target[targetProperty] = originalFn;
  }
}
