import { useCallback } from 'react';
import useToggle from './useToggle';

export default (): [(f: (...args: any[]) => void) => (...args: unknown[]) => void, boolean] => {
  const [state, toggle] = useToggle();

  const wrapper = useCallback(
    (f: (...fArgs: unknown[]) => void) =>
      (...args: unknown[]) => {
        try {
          toggle();
          f(...args);
        } catch (error) {
          console.error('Error in toggleWrapper');
          throw Error(String(error));
        } finally {
          toggle();
        }
      },
    [toggle],
  );

  return [wrapper, state];
};
