/**
 * Module to store data as json in a single cookie.
 */

import { namespace } from './object';
import Cookies from 'js-cookie';
import { bytes } from './string';

namespace('app.cookie');

const mod = {};

const name = 'app';
const max = 4093;

/**
 * Retrieve value from JSON object store in the cookie.
 * scope and persistId are concatenated to form the property name of
 * the value to retrieve.
 * @param {string} scope - Scope of the value.
 * @param {string} persistId - Id of the value.
 * @param {string} [defaultValue] - Optional, returned value if the requested property is not found.
 */
mod.get = (scope, persistId, defaultValue) => {
  const c = Cookies.getJSON(name);

  if (!scope) return c || {};
  if (!c) return defaultValue;
  const value = c[`${scope}-${persistId}`] || defaultValue;

  return value;
};

/**
 * Sets a property on the JSON object stored in the 'app' cookie.
 * scope and persistId are concatenated to form the property name to
 * set the value on in the JSON object.
 * e.g.
 * scope = 'foo', persistId = 'bar', value = 'cat'
 * results in: { foobar: 'cat' }
 *
 * @param {string} scope - Scope for this value.
 * @param {string} persistId - Id for this value.
 * @param {*} value - Value to store.
 */
mod.set = (scope, persistId, value) => {
  const c = Cookies.getJSON(name) || {};
  c[`${scope}-${persistId}`] = value;
  const stringified = JSON.stringify(c);
  const stringifiedBytes = bytes(stringified);
  if (stringifiedBytes >= max) {
    // Cookies.set silently fails in this case :(
    console.error(
      `Cookie set failed: cookie length (${stringifiedBytes} bytes) exceeds max (${max} bytes) `
    );
  } else {
    Cookies.set(name, c, { expires: 365 });
  }
};

mod.getName = () => name;

window.app.cookie = mod;
export default mod;
