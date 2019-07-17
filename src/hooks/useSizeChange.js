import { useEffect } from 'react';
import logger from '../logger';

/**
 * @param {Function} onSizeChange - Function to call immediately, on window resize, and orientation change
 * @param {Array} deps - Dependencies for the useEffect hook.
 */
function useSizeChange(onSizeChange, deps) {
  useEffect(() => {
    if (typeof onSizeChange !== 'function') {
      logger.error('Expected onSizeChange to be a function', onSizeChange);
      return;
    }
    onSizeChange();
    window.addEventListener('resize', onSizeChange);
    window.addEventListener('orientationchange', onSizeChange);

    return () => {
      window.removeEventListener('resize', onSizeChange);
      window.removeEventListener('orientationchange', onSizeChange);
    };
  }, deps);
}

export default useSizeChange;
