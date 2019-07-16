/* eslint-disable no-console */
/**
 * Module to abstract the console.
 * Performs the log only if
 * - the environment has a console,
 * - with the desired log function,
 * - and either the server is in dev mode or the browser is in debug mode.
 */

import { isDebugMode, isDevMode } from './misc';
import { noop } from './function';

const logger = {};

[
  'assert',
  'dir',
  'count',
  'log',
  'info',
  'debug',
  'warn',
  'error',
  'table',
  'trace',
  'group',
  'groupEnd',
  'groupCollapsed',
  'profile',
  'profileEnd',
  'time',
  'timeEnd',
  'timeStamp'
].forEach((key) => {
  const isLoggable = window.console && window.console[key];
  const shouldLog = isDevMode() || isDebugMode();

  logger[key] =
    isLoggable && shouldLog
      ? function log(...args) {
          window.console[key](...args);
        }
      : noop;
});

export default logger;
