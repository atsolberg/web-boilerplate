import React from 'react';
import { string, shape, objectOf, arrayOf } from 'prop-types';

import { validate } from './misc';

export const text = {
  /**
   * Weave <br>'s in between each string in an array of strings.
   * Each string in the original array is wrapped in a span to apply a key.
   * @param {String[]} textArray - The array of strings to weave <br>'s into.
   */
  break: (textArray) =>
    textArray.reduce((prev, curr, i) => {
      prev.push(<span key={`t-${i}`}>{curr}</span>);
      if (i < textArray.length - 1) prev.push(<br key={`b-${i}`} />);
      return prev;
    }, [])
};

export const validators = {
  /**
   * Returns a dom event handler (usually for `onBlur`)
   * that dispatches an action if the value is not a valid email.
   * @param {string} type - The action type.
   * @param {function} dispatch - The store dispatcher.
   * @param {string} [msg] - The Error message.
   * @returns {function} - The dom event handler.
   */
  email: (type, dispatch, msg) => (e) => {
    const { value } = e.target;
    msg = msg || 'Please enter a valid email address.';
    if (!validate.email(value)) dispatch({ type, value: msg });
  },

  /**
   * Returns a dom event handler that dispatches an action value is empty.
   * @param {string} type - The action type.
   * @param {function} dispatch - The store dispatcher.
   * @param {string} [msg] - The Error message.
   * @returns {function} - The dom event handler.
   */
  required: (type, dispatch, msg) => (e) => {
    const { value } = e.target;
    msg = msg || 'Required';
    if (!value || !value.trim()) dispatch({ type, value: msg });
  }
};

/**
 * Convenient condition helper to abstract ternaries like in jsx.
 * USAGE:
 * <ul>
 *   {rif(user, <li>Hi, {user}</li>}
 * </ul>
 */
export const rif = (condition, then, otherwise = '') =>
  condition ? then : otherwise;

export const unless = (condition, then, otherwise) =>
  !condition ? then : otherwise;

export const entitiesOf = (type) =>
  shape({
    byId: objectOf(type),
    allIds: arrayOf(string).isRequired
  });
