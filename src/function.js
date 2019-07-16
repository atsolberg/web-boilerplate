/**
 * FUNCTION UTILS
 */

import { prop } from './object';

export function lazy(f) {
  return function() {
    return f.apply(this, arguments);
  };
}

export const compose = (...fns) => (...args) =>
  fns.forEach((fn) => fn && fn(...args));

/** Returns `true` only if the property on the object is a function. */
export const isFunc = (...args) => {
  if (args.length === 1) return typeof args[0] === 'function';
  return typeof prop(args[0], args[1]) === 'function';
};

/**
 * Use as an ES6 default parameter to make a parameter required.
 * @param name - The required parameter name.
 *
 * USAGE:
 *  makeSandwich = (meat = required('meat'), cheese) => { ... };
 *  makeSandwich = ({ meat = required('meat'), cheese } = {}) => { ... };
 */
export const required = (name) => {
  throw new Error(`${name} is a required parameter.`);
};

/**
 * Pipe data through a series of functions.
 * @param {[Function]} fns - Array of functions to pipe data through.
 *
 * USAGE:
 * let fn1 = s => s.toLowerCase();
 * let fn2 = s => s.split('').reverse().join('');
 * let fn3 = s => s + '!'
 *
 * let emitter = pipe(fn1, fn2, fn3);
 * console.log(emitter('Time')); // emit!
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func - The function to debounce.
 * @param {Number} wait - The number of milliseconds to wait between triggering.
 * @param {boolean} [immediate] - Trigger the function on the leading edge, instead of the trailing.
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * USAGE:
 * let myEfficientFn = debounce(() => {
 *   // All the taxing stuff you do
 * }, 250);
 *
 * window.addEventListener('resize', myEfficientFn);
 */
export const debounce = function debounce(func, wait = 250, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = Array.from(arguments);
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/** Convenient 'do nothing' function that doesn't require an argument like void(0); */
export const noop = () => {};

export const identity = (o) => o;

/**
 * Combine many redux style reducers into one 'root' reducer function.
 * Similar to redux combineReducers except that redux reducers only
 * receive/update a piece of the app state. Ours receive and can update
 * the entire state object.
 * @param reducers - 0 to many reducer functions
 * @return {function(*=, *=)} a single 'root' reducer function
 */
export const combineReducers = (...reducers) => (state = {}, action) =>
  reducers.reduce((nextState, reducer) => reducer(nextState, action), state);

/**
 * Produces an event handler that expects to receive and event and will
 * only fire the provided callback if the event key code is the 'Enter' key.
 * Useful for valid a11y handling, i.e. divs with onClick's.
 *
 * USAGE:
 * <div onClick={changeImage} onKeyDown={onEnter(changeImage)}>
 *
 * @param {function} fn - the callback to fire on enter key.
 * @returns {Function}
 */
export const onEnter = (fn) => (e) => {
  if (e.keyCode === 13) fn(e);
};
