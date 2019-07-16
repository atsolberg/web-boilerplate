/**
 * Module to <sup> special characters.
 */
import React, { Fragment } from 'react';
import $ from 'jquery';

import { specials } from './constants';

const mod = {};

const marker = '.js-sup';

const chars = Object.keys(specials)
  .map((k) => specials[k].value)
  .join('');

mod.regex = new RegExp(`([${chars}])`, 'g');

/**
 * Wrap some characters in <sup> tags.
 * @param {string} text - The text to process.
 * @return {string} result - The resulting text with special chars <sup>'d.
 */
mod.replace = (text) => {
  if (!text) return text;
  return text.replace(mod.regex, '<sup>$1</sup>');
};

/**
 * Create an array of jsx elements to be output for the give text
 *
 * Ex:
 * Input: <div>{suppy.jsx('Sleep Number® Bed')}</div>
 * Output: <div><span>Sleep Number</span><sup>®</sup><span> Bed</span></div>
 *
 * Input: <div>{suppy.jsx('Plain Text')}</div>
 * Output: <div><span>Plain Text</span></div>
 *
 * @param text - Text that may contain symbols that should be superscript
 * @returns {jsx[]} JSX elements to be output
 */

mod.jsx = (text) =>
  text.split(mod.regex).map((part, idx) => {
    if (part.match(mod.regex)) {
      return <sup key={idx}>{part}</sup>;
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });

/**
 * Gets the inner text of the targeted element and adds a surrounding
 * <sup> tag to any special characters we normally want <sup>'d,
 * then puts it back as the inner html.
 * @param {string | Element} elem - CSS selector or DOM element to <sup>.
 */
mod.sup = (elem) => {
  elem = $(elem);
  let text = elem.text();
  text = mod.replace(text);
  elem.html(text);
};

mod.all = () => {
  // Sup all suppable nodes.
  const suppable = $(marker);
  suppable.each((idx, elem) => {
    mod.sup(elem);
  });
};

mod.init = () => {
  mod.all();
};

export default mod;
