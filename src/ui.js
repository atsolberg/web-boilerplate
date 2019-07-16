/**
 * Module to house common ui behavior.
 */

import $ from 'jquery';

import { styles } from './constants';
import { isIE } from './device';
import logger from './logger';
import { lastActivity } from './misc';
import { namespace } from './object';

import hub from './hub';

namespace('app.ui');

const mod = {};

/**
 * Find the first focusable element within the selector, and give it focus
 * @param {string} selector
 */
export const focusFirstElement = (selector = 'body') => {
  const container = document.querySelector(selector);
  const focusable = Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null); // remove hidden elements
  const firstFocusable = focusable.length ? focusable[0] : null;
  if (!firstFocusable) return;

  firstFocusable.focus();
};

/**
 * Fix up some ui things we couldn't figure out in the backend.
 * @private
 */
const touchUp = () => {
  // Detect and identify ie browsers.
  if (isIE()) {
    $('html').addClass('ie');
  }

  // Show modals that need to popup immediately on page load
  const instaModal = $('[data-show-onload]')[0];
  if (instaModal) {
    hub.sub(hub.topics.modalReady, () => {
      hub.pub(hub.topics.modal, { target: instaModal });
    });
  }
};

/**
 * Initialize our third-party libraries.
 * @private
 */
const librarySetup = () => {
  // Include CSRF token in request headers and
  // set cache to false, avoiding any stale ajax'd data.
  const { header, value } = window.app.globals.token;
  $.ajaxSetup({ headers: { [header]: value }, cache: false });
};

/**
 * Setup an tracker
 * @private
 */
const activityTracking = () => {
  const nineMin = 1000 * 60 * 9;
  let showing = false;

  // Update activity timer on ajax requests
  $(document).ajaxComplete((e, xhr, { url }) => {
    if (url[0] === '/') {
      window.app.lastActivity = Date.now();
    }
  });

  // Check if we need to show the prompt
  const check = () => {
    const now = Date.now();
    const diff = now - lastActivity;
    if (!showing && diff > nineMin) {
      hub.pub(hub.topics.activity, true);
      showing = true;
    }
    setTimeout(check, 5000);
  };
  check();

  // Hide the prompt
  $(document).on('click', '.js-wake-up', () => {
    // Fire an ajax req to trigger session activity
    $.ajax({ url: '/session-timing' });
    hub.pub(hub.topics.activity, false);
    showing = false;
  });

  // Toggle the prompt
  hub.sub(hub.topics.activity, (on) => {
    $('body').toggleClass('-activity-prompt', on);
  });
};

/**
 * Setup event listeners that every page will need.
 * @private
 */
const globalEventListeners = () => {
  function zoomDisable() {
    $('head meta[name=viewport]').remove();
    $('head').prepend(
      '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">'
    );
  }
  function zoomEnable() {
    $('head meta[name=viewport]').remove();
    $('head').prepend(
      '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">'
    );
  }

  // Disable auto zoom on on iOS input focus.
  $(document).on('touchstart', 'input[type=text], textarea', zoomDisable);
  $(document).on('touchend', 'input[type=text], textarea', () =>
    setTimeout(zoomEnable, 500)
  );

  // Submit forms from clicks elsewhere
  $(document).on('click', '[data-submit]', function(e) {
    e.preventDefault();
    const selector = $(this).data('submit');
    const $form = $(selector);
    if (!$form.is('form')) {
      logger.warn(`Could not submit, form target '${selector}' is not a form.`);
    } else {
      $form.submit();
    }
  });

  // Un-modal any register modals when un-modalers are clicked.
  $(document).on('click', '.js-unmodal', () => {
    hub.pub(hub.topics.unmodal);
  });

  // Follow the [data-href] value on clicks of elements with this attribute.
  $(document).on('click', '[data-href]', function(e) {
    e.preventDefault();
    window.location.href = $(this).data('href');

    return false;
  });

  // Pause/play videos
  $(document).on('click', '.js-play-pause', function() {
    const videoId = this.dataset.video;
    const video = $(`#${videoId}`)[0];
    if (video.paused) {
      video.play();
      this.innerHTML =
        '<span class="fa fa-pause" aria-hidden="true"></span><span class="sr-only">pause video</span>';
    } else {
      video.pause();
      this.innerHTML =
        '<span class="fa fa-play" aria-hidden="true"></span><span class="sr-only">play video</span>';
    }
  });

  // Replaces the bootstrap data-api modal toggling.
  // Tell the modal module that someone wants to open a modal.
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(
    e
  ) {
    const $this = $(this);
    const target = $this.attr('data-target') || $this.attr('href');
    if ($this.is('a')) e.preventDefault();

    hub.pub(hub.topics.modal, { target, trigger: e.currentTarget });
  });

  // Print on click
  $(document).on('click', '.js-print', (e) => {
    window.print();
    e.preventDefault();
  });
};

/**
 * Setup libraries and add global event listeners.
 */
mod.autowire = function() {
  touchUp();
  librarySetup();
  activityTracking();
  globalEventListeners();
  logger.info(`%cui: %cAutowired`, styles.strong, styles.value);
};

mod.autowire();

window.app.ui = mod;
export default mod;
