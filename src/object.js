/**
 * OBJECT UTILS
 */

const _identity = (o) => o;

/**
 * Namespace function: so we don't have to put all those checks to see if
 * modules exist and either create empty ones or set a reference to one
 * that was previously created.
 * See Zakas, Maintainable JavaScript, pp. 72-73, and
 * Stefanov, Javascript Patterns, pp. 89-90
 */
export const namespace = function(ns) {
  const parts = ns.split('.');
  let object;
  let i;
  let n;

  // Start the object if needed.
  if (!window[parts[0]]) {
    window[parts[0]] = {};
  }
  object = window[parts[0]];

  for (i = 1, n = parts.length; i < n; i++) {
    if (!object[parts[i]]) {
      object[parts[i]] = {};
    }
    object = object[parts[i]];
  }

  return object;
};

/**
 * Get the value of a property at a path without throwing a ReferenceError.
 * If the path contains a {undefined} or {null}, it is returned.
 * @param {object} obj - The object to lookup the property from.
 * @param {string} path - The property path string.
 * @returns {*} - The value at the end of the property path,
 *                or {null} or {undefined} if encountered.
 *
 * USAGE:
 * let employee = {
 *   name: 'Bob Vila',
 *   nicknames: ['Bobby V', 'Bob the Builder', 'The Veebs'],
 *   address: {
 *     street1: '12345 67th St',
 *     city: 'Minneapolis',
 *     state: {
 *       'iso-code': 'US-MN',
 *       'short-code': 'US-MN',
 *       'long-code': 'US-Minnesota'
 *     }
 *   }
 * };
 * let format = 'iso';
 *
 * // values without reference errors
 * prop(employee, 'name');                            // "Bob Vila"
 * prop(employee, 'address.street2');                 // undefined (NO REFERENCE ERROR THROWN!)
 *
 * // bracket syntax
 * prop(employee, "address.state['long-code']");      // "US-Minnesota"
 * prop(employee, 'address.state["short-code"]');     // "US-MN"
 * prop(employee, 'address.state[`short-code`]');     // "US-MN"
 * prop(employee, `address.state['${format}-code']`); // "US-MN"
 *
 * // and arrays, oh my!
 * prop(employee, 'nicknames[1]');                    // "Bob the Builder"
 * prop(employee, 'nicknames[1].length');             // 15
 * prop(employee, 'nicknames[3].length');             // undefined
 */
export const prop = (obj, path) => {
  if (!obj) return obj;
  let item = obj;

  // Handle bracket syntax.
  const normalized = path
    .replace(/\[/g, '.') // convert open bracket to dot
    .replace(/[\]"'`]/g, ''); // remove close bracket and all quote flavors

  const parts = normalized.split('.');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const value = item[part];

    // Allow empty strings/objects.
    const bad_value = typeof value === 'undefined' || value === null;
    const last_value = i === parts.length - 1;
    if (bad_value || last_value) return value;

    item = value;
  }
};

/**
 * Set a property at a path on an object. Parts of the path
 * that do not exist yet are lazily created.
 * @param {object} obj - The object to set a property on.
 * @param {string} path - The '.' separated property path to set.
 * @param {*} value - The value to set at the property path.
 *
 * USAGE:
 * setProp(employee, 'address.city', 'Rogers');
 * const bg = setProp({}, 'background.color', '#efefef');
 */
export const setProp = (obj, path, value) => {
  const parts = path.split('.');
  let object;
  let i;
  let n;

  object = obj; // Start the chain at our object.

  for (i = 0, n = parts.length; i < n; i++) {
    if (i === n - 1) {
      // At the end of the path, set the value.
      object[parts[i]] = value;
    } else {
      // If this part of the path isn't there, fill in with object literal.
      if (!object[parts[i]]) object[parts[i]] = {};
      object = object[parts[i]]; // Move `object` to the next path part.
    }
  }

  return obj;
};

/**
 * Returns and array of the values in an object.
 * It only returns the objects own values, not those from the prototype chain.
 */
export const values = (obj) => {
  if (Object.values) return Object.values(obj);
  return Object.keys(obj || {}).map((key) => obj[key]);
};

/** Reverses a simple object containing key - value pairs. */
export const reverse = (obj, callback = _identity) =>
  Object.keys(obj).reduce((prev, curr) => {
    prev[obj[curr]] = callback(curr);
    return prev;
  }, {});

/**
 * Returns true if `a` contains the same keys with the same values as `b`.
 * Uses strict equality (===) and does not support `NaN`.
 */
export const shallowEqual = (a, b) => {
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) return false;
  }
  for (const key in b) {
    if (!(key in a) || a[key] !== b[key]) return false;
  }
  return true;
};

/**
 * Returns a new object containing only the properties listed in `props`.
 * @param {object} o - The object to get properties from.
 * @param {String[]} props - Array of property names to keep.
 * @return {object} - The resulting object containing only the properties listed in `props`.
 *
 * USAGE:
 * const vowels = shrink({ a: 'a', c: 'c', e: 'e' }, ['a', 'e']); // { a: 'a', e: 'e' }
 */
export const shrink = (o, props) =>
  props.reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
  }, {});

/**
 * Returns `true` if the JSON.stringify result is the same for both arguments.
 * Order matters, properties or array elements in different orders will result in `false`.
 */
export const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Returns true if the given object has the 'own' property
 * @param o - the object to check for a property
 * @param p - the property name to check for
 * @return {boolean}
 */
export const has = (o, p) => Object.prototype.hasOwnProperty.call(o, p);
