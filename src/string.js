/* eslint-disable no-bitwise */
/**
 * STRING UTILS
 */

export function capitalize(string) {
  if (!string) return string;
  return string[0].toUpperCase() + string.slice(1);
}

export function titlecase(sentence) {
  if (!sentence) return sentence;
  return sentence.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  );
}

export const repeat = (str, times) => new Array(times + 1).join(str);

export const wordCount = (string) => string.trim().split(/\s+/).length;

export const pad = (num, maxLength) =>
  repeat(`0`, maxLength - num.toString().length) + num;

export const replaceAt = (s, i, c) => s.substr(0, i) + c + s.substr(i + 1);

export const endsWith = (s, c) => s[s.length - 1] === c;

/**
 * Generate a universally unique identifier.
 * @return {string}
 */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;

    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

/** Add a uuid to something if it doesn't already have one. */
export const lazyId = (o) => {
  o.id = o.id || uuid();
  return o;
};

/** Return the size of a string in bytes assuming UTF-8 encoding. */
export const bytes = (str) => {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  const m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
};

/**
 * Returns either an empty string, a plural character of choice, or
 * an optional singular form.
 * @param {boolean} condition False will return an empty string.
 * @param {string} plural Plural suffix, 's' by default.
 * @param {string} [singular] Optional singular suffix, or version.
 */
export const pluralIf = (condition, plural = 's', singular) => {
  if (!condition) return singular || '';
  return plural;
};
