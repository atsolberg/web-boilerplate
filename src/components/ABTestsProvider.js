/**
 * A component to provide a/b testing data to components via react context.
 * @see https://kentcdodds.com/blog/application-state-management-with-react
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 *
 * USAGE: Wrap your content in this component and then in any child component
 * of your tree, simply use the `useABTests()` hook to get the data.
 * To set test data use `
 *
 * Example:
 * // App.js
 * function App() {
 *   return (
 *     <ABTestsProvider>
 *       ...
 *         ...
 *           <MyLeafComp/>
 *         ...
 *       ...
 *     </ABTestsProvider>
 *   );
 * }
 *
 * render(<App />, target);
 *
 * // MyLeafComp.js
 * function MyLeafComp() {
 *   const tests = useABTests();
 *   return (
 *     <span>
 *       {tests.superLoudCTA ? 'SHOP NOW!' : 'Shop Things'}
 *     </span>
 *   );
 * }
 *
 *
 * Monetate Javascript Action:
 * window.app.abtests.setTestData({ superLoudCTA: true });
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef
} from 'react';
import { namespace } from '../object';
import { uuid } from '../string';

let tests = {};
const providers = {};
const ABTestsContext = createContext(tests);

/**
 * A provider component to provide test data via the `useABTests` hook.
 *
 * Each instance of `<ABTestsProvider>` creates a state setter, "poke",
 * which is added to a `providers` cache.  We use the setters to cause
 * renders when anyone updates the `tests` data.
 *
 * Setters are clean out on unmount.
 */
function ABTestsProvider(props) {
  const ref = useRef(uuid());
  // Create state just for the setter, which we will use to cause a render.
  const [, poke] = useState(Date.now());

  // Record our setter in a cache on mount
  useEffect(() => {
    const id = ref.current;
    providers[id] = poke;

    // Clean up if necessary
    return () => delete providers[id];
  }, []);

  return <ABTestsContext.Provider value={tests} {...props} />;
}

export function setTestData(testData) {
  // By re-creating this object, React will re-render the context consumers
  // since the value will fail the equality check.
  tests = { ...tests, ...testData };
  // Call all the state setters to cause them to rerender.
  Object.values(providers).forEach((poke) => poke(Date.now()));
}

export function getTestData() {
  return tests;
}

export function useABTests() {
  const context = useContext(ABTestsContext);
  if (!context) {
    throw new Error(`useABTests must be used within an ABTestsProvider`);
  }
  return context;
}

namespace('app.abtests');
window.app.abtests.setTestData = setTestData;
window.app.abtests.getTestData = getTestData;

export default ABTestsProvider;
