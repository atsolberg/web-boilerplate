/**
 * Adds a fixed button to scroll to the top of the page.
 * Button ID: `#back-to-top`
 */

import $ from 'jquery';

import { debounce } from './function';

let visible = false;

/**
 * Toggle animation of arrow from right side of screen.
 */
function toggleArrow() {
  const $backToTop = $('#back-to-top');
  if ($(window).scrollTop() > 300) {
    if (!visible) {
      visible = true;
      $backToTop.animate({ right: 0 });
    }
  } else if (visible) {
    visible = false;
    $backToTop.animate({ right: '-50px' });
  }
}

$(window).on('scroll', debounce(toggleArrow));
