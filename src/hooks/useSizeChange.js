import { useEffect } from 'react';
import logger from '../logger';

/**
 * @param {Function} sizeFunc - Function to call immediately, on window resize, and orientation change
 * @param {Array} deps - Dependencies for the useEffect hook.
 */
export default function useSizeChange(sizeFunc, deps) {
  useEffect(() => {
    if (typeof sizeFunc !== 'function') {
      logger.error('Expected sizeFunc to be a function', sizeFunc);
      return;
    }
    sizeFunc();
    window.addEventListener('resize', sizeFunc);
    window.addEventListener('orientationchange', sizeFunc);

    return () => {
      window.removeEventListener('resize', sizeFunc);
      window.removeEventListener('orientationchange', sizeFunc);
    };
  }, deps);
}
