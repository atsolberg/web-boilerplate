/**
 * Track the previous value of something.
 * See https://egghead.io/lessons/react-track-values-over-the-course-of-renders-with-react-useref-in-a-custom-useprevious-hook
 */

import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
