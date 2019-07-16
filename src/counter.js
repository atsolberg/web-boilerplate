/**
 * Module to display and update count down widgets.
 */

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

import { pad } from './string';

const mod = {};

/**
 * Return object with hours, days, minutes, seconds based on ms
 * @param ms
 * @returns {{d: number | *, h: number|*, m: number|*, s: number|*}}
 */
const formatTime = (ms) => {
  let days;
  let hours;
  let minutes;
  let seconds;

  seconds = Math.floor(ms / 1000);
  minutes = Math.floor(seconds / 60);
  seconds %= 60;
  hours = Math.floor(minutes / 60);
  minutes %= 60;
  days = Math.floor(hours / 24);
  hours %= 24;

  return { days, hours, minutes, seconds };
};

/**
 * Returns time in ms until future date
 * @param future {Date} Date in future
 * @returns {int} ms difference between two dates
 */
const getTimeUntil = (future) =>
  future.getTime() > Date.now() ? future.getTime() - Date.now() : null;

/**
 * Countdown Clock component
 */
function CountdownClock({ endTime }) {
  const [remainingTime, setRemainingTime] = useState(0);
  const counter = useRef(null);

  useEffect(() => {
    counter.current = setInterval(() => {
      setRemainingTime(getTimeUntil(endTime));
    });

    return () => {
      clearInterval(counter.current);
    };
  }, [counter]);

  const { seconds, minutes, hours, days } = formatTime(remainingTime);

  return (
    <div className="counter">
      <div className="counter-part">
        <span className="counter-value">{pad(days, 2)}</span>
        <div className="padded-down-xs type-text">Days</div>
      </div>
      <div className="counter-separator">
        <span>:</span>
      </div>
      <div className="counter-part">
        <span className="counter-value">{pad(hours, 2)}</span>
        <div className="padded-down-xs type-text">Hours</div>
      </div>
      <div className="counter-separator">
        <span>:</span>
      </div>
      <div className="counter-part">
        <span className="counter-value">{pad(minutes, 2)}</span>
        <div className="padded-down-xs type-text">Minutes</div>
      </div>
      <div className="counter-separator">
        <span>:</span>
      </div>
      <div className="counter-part">
        <span className="counter-value">{pad(seconds, 2)}</span>
        <div className="padded-down-xs type-text">Seconds</div>
      </div>
    </div>
  );
}

mod.init = () => {
  const counters = $('[data-countdown]');

  counters.each((idx, item) => {
    const loaded = $(item).data('loaded');
    if (loaded) return;

    const date = $(item)
      .data('countdownDate')
      .split('-');

    const time = $(item)
      .data('countdownTime')
      .split(':');

    const utcEndTime = new Date(
      `${date[0]}/${date[1]}/${date[2]} ${time[0]}:${time[1]}:${time[0]} UTC`
    );

    const timeRemaining = getTimeUntil(utcEndTime);

    if (timeRemaining) {
      render(<CountdownClock endTime={utcEndTime} />, item);
    }
  });
};

export default mod;
