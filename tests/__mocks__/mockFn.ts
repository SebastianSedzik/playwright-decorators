/**
 * Mock object method.
 * Returns cleanup function to restore original method.
 * @param target - target object.
 * @param targetProperty - name of property from target object.
 * @param mock - mock function to be called instead of original one.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockFn = <T>(target: T, targetProperty: keyof T, mock: (...args: any[]) => void): () => void => {
  const originalFn = target[targetProperty];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  target[targetProperty] = mock;

  return () => {
    target[targetProperty] = originalFn;
  }
}
