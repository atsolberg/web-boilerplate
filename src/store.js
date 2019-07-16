/**
 * Module to create data stores.
 */

import React, { useCallback, useMemo, useState } from 'react';
import $ from 'jquery';

import { styles, css } from './constants';
import { prop, values } from './object';
import { noop } from './function';
import { uuid } from './string';
import { isDebugMode, isDevMode, format, formats } from './misc';
import logger from './logger';

/** Mapping of store id to store instance */
const stores = {};

const mod = {};

/**
 * Create a 'redux' like store.
 * @param {object} blueprint - The root reducer blueprint
 * @param {string} blueprint.name - The root reducer's name
 * @param {function} blueprint.handle - The root reducer reduce function
 * @param {function} blueprint.getDefaultState - Function to return the reducer's initial state
 * @return {{
 *   id: string,
 *   name: string,
 *   getState: function(): Object,
 *   getListeners: function(): Array,
 *   getHandler: function(),
 *   subscribe: function(Function),
 *   dispatch: function((Object|Object[])),
 *   change: function(string, *=): function(*=),
 *   select: function(string, *=): function(*)
 * }}
 */
export const createStore = (blueprint) => {
  // Log actions when the server in dev mode or is the client in debug mode.
  const logging = isDevMode() || isDebugMode();

  const { name, context, handle: rootReducer } = blueprint;
  let state = blueprint.getDefaultState();

  let listeners = [];

  /** Retrieve the current state of the store. */
  const getState = () => state;

  /**
   * Select portions of the state tree
   *
   * @param {Object.<string, string|function>} selectors -
   *   Map of prop names to either
   *     1. string - Part of the state tree to be selected
   *     2. function - Run on the state to return the value
   * @param {Object} [currentState=getState()] -
   *   State to run against. Defaults to the stores state.
   *   Use this parameter if the state is a combination of multiple store states.
   * @returns props based on the selectors
   */
  const selectState = (selectors, currentState = getState()) => {
    const props = {};

    if (!selectors) {
      return props;
    }
    Object.keys(selectors).forEach((propName) => {
      const selector = selectors[propName];
      if (typeof selector === 'string') {
        props[propName] = prop(currentState, selector);
      } else if (typeof selector === 'function') {
        props[propName] = selector(currentState);
      }
    });
    return props;
  };

  /**
   * Return the store handler reference.
   * Useful when the store owner should prime the handler with
   * recently acquired static data before using.
   */
  const getHandler = () => blueprint;

  /**
   * Dispatch an action or actions to the action handler,
   * then notify all store listeners.
   * @param {object|object[]} action - The action or array of actions
   *                                   to dispatch.
   */
  const dispatch = (action) => {
    const multi = Array.isArray(action);

    if (logging) {
      const canGroup = logger.groupCollapsed !== noop;
      const time = format.date(new Date(), formats.time.PRECISE);
      const grouper = canGroup ? logger.groupCollapsed : logger.info;
      const type = multi ? action.map((a) => a.type).join(', ') : action.type;

      grouper.apply(logger, [
        `${time} %cstore: %c${name} %caction${multi ? 's' : ''}: %c${type}`,
        `${styles.label}`,
        `${styles.value}`,
        `${styles.label}`,
        `${styles.value}`
      ]);
      logger.info('%cBefore', `${css.gray}`, state);
      logger.info(`%cAction${multi ? 's' : ''}`, `${css.blue}`, action);
    }

    if (multi) {
      if (!action.length) return;
      action.forEach((a) => {
        state = rootReducer(state, a);
      });
    } else {
      state = rootReducer(state, action);
    }

    if (logging) {
      logger.info('%cAfter', `${css.green}`, state);
      logger.groupEnd();
    }

    listeners.forEach((listener) => listener());
  };

  /**
   * Returns an event handler function to dispatch actions with
   * a `type` and `value` property. If the first argument is an
   * event, the `value` is pulled from the  event's current target,
   * otherwise the first argument is used as the `value`.
   *
   * Useful for creating `onClick` or `onChange` handlers.
   *
   * @param {string} type - The action type.
   * @param {*} [item] - Optional identifier of item to change.
   * @returns {function()} - The dom event callback.
   */
  const change = (type, item) => (arg) => {
    let value;
    const isEvent = typeof arg === 'object' && arg.currentTarget;

    if (isEvent) {
      if (arg.currentTarget.type === 'checkbox') {
        value = arg.currentTarget.checked;
      } else {
        // eslint-disable-next-line prefer-destructuring
        value = arg.currentTarget.value;
      }
    } else {
      value = arg;
    }

    dispatch({ type, item, value });
  };

  /**
   * Helper method that returns a dom callback just like #change
   * but for ReactBootstraps' `onSelect` handlers.
   * @see https://react-bootstrap.github.io/components.html
   * @param {string} type - The action type.
   * @param {*} [item] - Optional identifier of item to select.
   * @returns {function(e, value)} - The dom event callback.
   */
  const select = (type, item) => (value) => {
    dispatch({ type, item, value });
  };

  /**
   * Register a listener callback to the store.
   * Listeners callbacks are fired after actions are dispatched in the
   * order they were registered.
   * @param {function} listener - The listener callback to register.
   * @returns {function} - A function to unregister the listener.
   */
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const getListeners = () => listeners;

  // Fire an initial dispatch to prime this store
  dispatch({});

  const id = uuid();

  // Create the store object to return.
  const store = {
    id,
    name,
    context,
    getState,
    selectState,
    getListeners,
    getHandler,
    subscribe,
    dispatch,
    change,
    select
  };

  stores[id] = store;

  // Tell the world _this_ store was created
  $(document).trigger({ type: `app.store.created.${store.name}`, store });

  return store;
};

/**
 * Creates a store state provider component and a dispatch function that will
 * trigger your render for you. No need to subscribe to your store.
 * @param blueprint - the store blueprint
 * @returns {*[]} an array containing the provider component and dispatch function
 */
export function createProvider(blueprint) {
  const store = createStore(blueprint);

  const providers = {};

  /**
   * When an instance of Provider dispatches, this will also re-render other
   * instances of Provider, even in other react roots. Replaces the need to
   * subscribe and rerender in controllers when using multiple react roots.
   * @param {string} dispatchingAppId - id of the Provider that dispatched.
   * @param {object} theProviders - map of provider ids to rerender functions.
   */
  function rerenderOthers(dispatchingAppId, theProviders) {
    Object.keys(theProviders)
      .filter((key) => key !== dispatchingAppId)
      .forEach((id) => {
        const rerender = theProviders[id];
        rerender(uuid());
      });
  }

  const { context: Context } = blueprint;

  /**
   * Using react context as the app state management lib.
   * @see https://kentcdodds.com/blog/application-state-management-with-react
   * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
   * @param {boolean} [broadcast] - if `true`, all instances of this Provider
   *                                will re-render when one of them dispatches.
   * @param {string} [id] - if `broadcast` is present, `id` is required.
   */
  function Provider({ broadcast, id, ...rest }) {
    if (broadcast) {
      if (!id) {
        throw new Error(
          'When using `broadcast`, each Provider must have a unique `id` prop.'
        );
      }
    }

    const [, rerender] = useState(0);
    if (broadcast) {
      providers[id] = rerender;
    }

    const state = store.getState();

    /**
     * Dispatch an action or actions to the action handler,
     * then notify all store listeners.
     * @param {object|object[]} action - The action or array of actions to dispatch.
     */
    const dispatch = useCallback(
      (action) => {
        store.dispatch(action);
        rerender(uuid()); // Set provider state to new value, causing a render
        if (broadcast) rerenderOthers(id, providers);
      },
      [broadcast, id]
    );

    /**
     * Returns an event handler function to dispatch actions with
     * a `type` and `value` property. If the first argument is an
     * event, the `value` is pulled from the  event's current target,
     * otherwise the first argument is used as the `value`.
     *
     * Useful for creating `onClick` or `onChange` handlers.
     *
     * @param {string} type - The action type.
     * @param {*} [item] - Optional identifier of item to change.
     * @returns {function()} - The dom event callback.
     */
    const change = useCallback(
      (type, item) => {
        return function onChange(arg) {
          let value;
          const isEvent = typeof arg === 'object' && arg.currentTarget;

          if (isEvent) {
            if (arg.currentTarget.type === 'checkbox') {
              value = arg.currentTarget.checked;
            } else {
              // eslint-disable-next-line prefer-destructuring
              value = arg.currentTarget.value;
            }
          } else {
            value = arg;
          }

          dispatch({ type, item, value });
        };
      },
      [dispatch]
    );

    /**
     * Helper method that returns a dom callback just like #change
     * but for ReactBootstraps' `onSelect` handlers.
     * @see https://react-bootstrap.github.io/components.html
     * @param {string} type - The action type.
     * @param {*} [item] - Optional identifier of item to select.
     * @returns {function(e, value)} - The dom event callback.
     */
    const select = useCallback(
      (type, item) => {
        return function onSelect(value) {
          dispatch({ type, item, value });
        };
      },
      [dispatch]
    );

    const value = useMemo(() => ({ state, dispatch, change, select }), [
      state,
      dispatch,
      change,
      select
    ]);
    return <Context.Provider value={value} {...rest} />;
  }

  return [Provider, store];
}

/**
 * Useful error creator for the useStore hook.
 * @param {string} name - the store name.
 * @returns {Error}
 */
export function providerError(name) {
  return new Error(
    `useStore must be used within the "${name}" store's Provider`
  );
}

/**
 * Register to receive a store by name when it is available.
 * @param {string} name - the name of the store.
 * @return {$.Deferred} - a promised resolved with the store when
 *                        it is available.
 */
export function onStore(name) {
  const dfd = $.Deferred();
  const store = Object.values(stores).reduce((prev, s) => {
    let result = prev;
    if (s.name === name) result = s;
    return result;
  }, null);

  if (store) {
    dfd.resolve(store);
  } else {
    $(document).one(`app.store.created.${name}`, (e) => {
      dfd.resolve(e.store);
    });
  }

  return dfd;
}

export default mod;
