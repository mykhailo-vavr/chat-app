export const asyncWrapper =
  (f: (...args: unknown[]) => Promise<void>) =>
  (...args: unknown[]) => {
    f(...args).catch(console.error);
  };
