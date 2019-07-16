/**
 * A moderate set of polyfills.
 * Probably should just let babel do this programmatically for last 2 versions
 * of supported browsers.
 */

import 'url-polyfill';
import 'custom-event-polyfill';

import 'core-js/fn/array/includes';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/from';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'core-js/fn/string/ends-with';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';
import 'core-js/fn/string/trim';
import 'core-js/es7/set';
import 'core-js/es7/map';

/**
 * String.prototype.contains
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#String.prototype.contains
 *
 * Still needed because of a recent rename of 'contains' to 'includeds'.
 */
if (!String.prototype.contains) {
  String.prototype.contains = String.prototype.includes; // eslint-disable-line no-extend-native
}
