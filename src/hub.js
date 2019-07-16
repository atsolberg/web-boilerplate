/**
 * A simple pub/sub module.
 * @see http://davidwalsh.name/pubsub-javascript
 */

import { useEffect } from 'react';

import { noop } from './function';
import { styles } from './constants';
import logger from './logger';

const topics = {};
const hop = topics.hasOwnProperty;

/**
 * Log a notification for a topic publication.
 * @param {string} topic - the topic that was published.
 * @param {number} listeners - the number of listeners.
 * @param {*} data - the data for the publication.
 */
const log = (topic, listeners, data) => {
  let notif = `%chub: %cPublished %c'${topic}' %cto ${listeners} subscriber(s)`;
  const hasData = typeof data !== 'undefined';
  if (hasData) notif += ' with data:';

  const grouper = (hasData && logger.groupCollapsed) || logger.info;
  const groupend = (hasData && logger.groupEnd) || noop;

  const consoleStyles = [
    `${styles.strong}`,
    `${styles.normal}`,
    `${styles.value}`,
    `${styles.normal}`
  ];

  grouper.apply(console, [notif, ...consoleStyles]);
  if (hasData) logger.info(data);
  groupend();
};

const mod = {
  /** Some common topics. */
  topics: {
    modal: 'modal',
    modalReady: 'modal.ready',
    unmodal: 'unmodal',
    activity: 'activity'
  },

  /**
   * Subscribe a listener function to be notified of an event on a topic.
   * Returns an object with a 'remove' property as a function to remove
   * the registered listener.
   *
   * @param {string} topic - The topic to subscribe to.
   * @param {Function} listener - The listener function fired for each
   *                              event on the topic.
   * @return {Object} o - Listener removal handler.
   */
  sub: (topic, listener) => {
    // Create the topic's object if not yet created
    if (!hop.call(topics, topic)) topics[topic] = [];

    // Add the listener to topic's listener queue
    const index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of a topic listener
    return {
      remove: () => {
        delete topics[topic][index];
      }
    };
  },

  /**
   * Publish an event on the topic with optional data.
   *
   * @param {string} topic - The topic to publish the event on.
   * @param {Object} [data] - The optional data to pass the listeners.
   */
  pub: (topic, data) => {
    // If the topic doesn't exist or it has no listeners in queue, just leave.
    if (!hop.call(topics, topic)) return;

    // Cycle through topics queue, fire!
    const listeners = topics[topic];
    listeners.forEach((listener) => listener(data || {}));

    log(topic, listeners.length, data);
  }
};

/**
 * Custom hook to react to hub subscriptions as a side effect.
 * @param {string} topic - The topic to subscribe to.
 * @param {Function} listener - The listener function fired for each
 *                              event on the topic.
 * @param {Function} [onReady] - A callback fired when the subscription has been registered.
 */
export const useSubscription = (topic, listener, onReady) => {
  useEffect(
    () => {
      logger.info(`Registering subscription on '${topic}'`);
      const subscription = mod.sub(topic, listener);
      if (typeof onReady === 'function') onReady();
      return subscription.remove;
    },
    // Unsub/Resub if they change topics but not handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topic]
  );
};

export default mod;
