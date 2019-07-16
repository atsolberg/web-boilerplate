/**
 * MISC UTILS
 */

import { pad, replaceAt } from './string';

// Is the server in dev mode
const devMode = window.globals.config.dev === 'true';

// Is the browser in debug mode
let debugMode = false;

export const isDevPage = window.location.pathname.startsWith('/dev/');

export const timezone =
  'Intl' in window
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'America/Chicago';

/**
 * Parses the inner text contents of 'selector' as JSON and returns it.
 * Returns undefined if not target is found for 'selector'.
 * @param {string} selector - The css selector to the element parse text contents of.
 */
export const json = (selector) => {
  const target = $(selector);
  return target.length ? JSON.parse(target.text()) : undefined;
};

/**
 * Converts form inputs/values into a json string.
 * @param {string} selector - The css selector to the form.
 * @returns {string} json - The resulting json string.
 */
export const jsonForm = (selector) => {
  const data = $(selector).serializeArray();
  const result = {};

  data.forEach((input) => {
    result[input.name] = input.value;
  });

  return JSON.stringify(result);
};

/**
 * Converts form inputs/values into a json object.
 * @param {string} selector - The css selector of the form.
 * @returns {object} json - The resulting json object.
 */
export const jsonFormObject = (selector) => {
  const data = $(selector).serializeArray();
  const result = {};

  data.forEach((input) => {
    result[input.name] = input.value;
  });

  return result;
};

export const formats = {
  date: {
    SIMPLE: (date) =>
      date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }),

    MONTH_ABR_DAY_YEAR: (date) =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),

    MONTH_DAY_YEAR: (date) => date.toLocaleDateString('en-US'),

    /* eslint-disable prefer-template */
    /* See https://www.iso.org/iso-8601-date-and-time-format.html */
    ISO: (date) =>
      date.getUTCFullYear() +
      '-' +
      pad(date.getUTCMonth() + 1, 2) +
      '-' +
      pad(date.getUTCDate(), 2)
    /* eslint-enable prefer-template */
  },
  time: {
    SIMPLE: (time) =>
      time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      }),

    ARMY: (time) =>
      time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),

    PRECISE: (time) =>
      `${pad(time.getHours(), 2)}` +
      `:${pad(time.getMinutes(), 2)}` +
      `:${pad(time.getSeconds(), 2)}` +
      `.${pad(time.getMilliseconds(), 3)}`
  },
  datetime: {
    SIMPLE: (datetime) =>
      datetime.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      })
  }
};

/** Formatters */
export const format = {
  /**
   ** Format a Date object into a date, with the browser's timezone and a configurable format
   * @see https://momentjs.com/docs/#/displaying/ for format examples.
   * @param {Date} [date] - Unix timestamp to format as a readable date-time. Defaults to now.
   * @param {Function} [formatter] - The format to use. Defaults to 'MMM D, YYYY'.
   */
  date: (date = new Date(), formatter = formats.date.MONTH_ABR_DAY_YEAR) =>
    // TODO: Remove this new Date() and validate usages
    formatter(new Date(date)),

  /**
   * Return a formatted percent string to the decimal places specified.
   * USAGE:
   * format.percent(13, 205, 3) // "6.341%"
   * format.percent(5, 10, 3) // "50%"
   * @param {Number} count - The current count of items.
   * @param {Number} total - The total number of items.
   * @param {Number} decimals - The number of decimal places.
   */
  percent(count, total, decimals = 3) {
    return `${Number(((count / total) * 100).toFixed(decimals)).toString()}%`;
  },

  /**
   * Return a formatted currency string for the supplied number.
   * USAGE:
   * format.currency(123456789.12345) // "$123,456,789.12"
   * @param {string|number} n - the currency amount.
   * @param {boolean} trim - if `true`, '.00' is ommitted, default to `false`.
   */
  currency(n, trim = false) {
    const trimming = trim ? '.00' : '';
    const c = 2;
    const d = '.';
    const t = ',';
    const s = n < 0 ? '-$' : '$';
    const i = `${parseInt((n = Math.abs(+n || 0).toFixed(c)), 10)}`;
    let j = i.length;
    j = j > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : ''
      ).replace(trimming, '')
    );
  },

  /**
   * Returns a phone number string in the format "(###) ### - ####".
   * @param {string} number - Phone number to format.
   */
  phone(number) {
    let area = '___';

    let first = '___';

    let second = '____';

    const stripped = number.toString().replace(/[^\d]/g, '');

    if (!stripped.length) return '';

    for (let i = 0; i < 10; i++) {
      const digit = stripped[i];
      if (typeof digit === 'undefined') break;

      if (i < 3) {
        area = replaceAt(area, i, digit);
      } else if (i < 6) {
        first = replaceAt(first, i - 3, digit);
      } else {
        second = replaceAt(second, i - 6, digit);
      }
    }

    return `(${area}) ${first}-${second}`.replace(/_/g, '');
  },

  /**
   * Reduce a numerator and denominator to it's smallest,
   * integer ratio using Euclid's Algorithm.
   */
  ratio(numerator, denominator) {
    let flip = false;
    const gcd = (a, b) => {
      if (b === 0) return a;
      return gcd(b, a % b);
    };

    if (numerator === denominator) return '1 : 1';

    // Make sure numerator is always the larger number
    if (+numerator < +denominator) {
      flip = true;
      const temp = numerator;
      numerator = denominator;
      denominator = temp;
    }

    const divisor = gcd(+numerator, +denominator);

    return flip
      ? `${denominator / divisor} : ${numerator / divisor}`
      : `${numerator / divisor} : ${denominator / divisor}`;
  }
};

export const regex = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,

  zip_partial: /^\d{1,5}$/,
  zip: /^\d{5}$/,
  zip_full: /^[0-9]{5}(?:-[0-9]{4})?$/,

  iso_state: /(US-[A-Z]{2})/,

  geo: {
    lat: /^-?([0-8]?[0-9]|90)\.[0-9]{1,6}$/,
    long: /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,6}$/
  },

  /** @see http://www.regular-expressions.info/creditcard.html */
  cc: {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    master: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  }
};

/** General purpose validators */
export const validate = {
  /**
   * Returns true if the string is less than or equal to the limit.
   * @param {string} input - the string to test.
   * @param {number} max - the length to check for.
   */
  max: (input, max) => {
    if (typeof input !== 'string') throw Error('Input is not a string.');
    return input.trim().length <= max;
  },

  /**
   * Returns true if the string is greater than or equal to the limit.
   * @param {string} input - the string to test.
   * @param {number} min - the length to check for.
   */
  min: (input, min) => {
    if (typeof input !== 'string') throw Error('Input is not a string.');
    return input.trim().length >= min;
  },

  /**
   * For string inputs, returns true if the string is between the min and max.
   * For number inputs, returns true if the number is between the min and max.
   * @param {string|number} input - the number or string to test.
   * @param {number} min - the minimum length.
   * @param {number} max - the maximum length.
   */
  between: (input, min, max) => {
    if (typeof input === 'string') {
      const { length } = input.trim();
      return length >= min && length <= max;
    }
    if (typeof input === 'number') {
      return input >= min && input <= max;
    }
    throw Error(`Input is not a number or string: ${input}`);
  },

  /**
   * Returns true if the supplied latitude is valid, otherwise false.
   * i.e. >= -90 and <= 90, with 6 or less decimal digits
   */
  latitude: (lat) => {
    if (lat > 90 || lat < -90) return false;
    return regex.geo.lat.test(lat);
  },

  /**
   * Returns true if the supplied longitude is valid, otherwise false.
   * i.e. >= -180 and <= 180, with 6 or less decimal digits
   */
  longitude: (long) => {
    if (long > 180 || long < -180) return false;
    return regex.geo.long.test(long);
  },

  email: (email) => !!(email || '').trim() && regex.email.test(email),

  zip_partial: (zip) => regex.zip_partial.test(zip),

  zip: (zip) => regex.zip.test(zip),

  cc: {
    visa: (number) => regex.cc.visa.test(number),
    master: (number) => regex.cc.master.test(number),
    amex: (number) => regex.cc.amex.test(number),
    diners: (number) => regex.cc.diners.test(number),
    discover: (number) => regex.cc.discover.test(number),
    jcb: (number) => regex.cc.jcb.test(number),

    all: (number) =>
      regex.cc.visa.test(number) ||
      regex.cc.master.test(number) ||
      regex.cc.amex.test(number) ||
      regex.cc.diners.test(number) ||
      regex.cc.discover.test(number) ||
      regex.cc.jcb.test(number),

    type: (number) => {
      let type = null;
      Object.keys(regex.cc).forEach((re) => {
        if (regex.cc[re].test(number)) type = re;
      });
      return type;
    }
  }
};

/**
 * Jquery (and plain old javascript) returns color values in rgb format.
 * Converts `rgb(0, 153, 51)` to `#009933`.
 * @param {string} rgb - the rgb color string to convert.
 */
export const rgbToHex = (rgb) => {
  if (!rgb) return '#000000';

  const hex = (x) => `0${parseInt(x, 10).toString(16)}`.slice(-2);

  // IE8 returns color in hex
  if (rgb.match(/^#[\da-f]{6}$/)) return rgb;

  const parts = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
  const hash = hex(parts[1]) + hex(parts[2]) + hex(parts[3]).toLowerCase();

  return `#${hash}`;
};

/** Returns the browser locale. Defaults to `en-US`. */
export const locale = () =>
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';

export const lastActivity = Date.now();

/** Retrieve a request parameter by name. */
export const getParameterByName = (name, url = window.location.href) => {
  const sanitizedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexS = `[\\?&]${sanitizedName}=([^&#]*)`;
  const results = new RegExp(regexS, 'i').exec(url);

  if (results === null) {
    return null;
  }
  return decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Get Element by ID
 * @param id
 * @returns {HTMLElement | null}
 */
export const gebi = (id) => document.getElementById(id);

export const isDevMode = () => devMode;

debugMode = getParameterByName('debug') !== null;
export const isDebugMode = () => debugMode;
