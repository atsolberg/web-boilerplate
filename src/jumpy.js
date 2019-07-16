/**
 * Module for screen scrolling behavior.
 */

import { focusFirstElement } from './ui';

function smoothScroll(e) {
  const $target = $(e.currentTarget);
  let offset = 0;
  const selector = $target.attr('data-jumpto') || $target.attr('href');
  const $el = $(selector);

  if ($target.attr('data-jumpto-offset'))
    offset = $target.attr('data-jumpto-offset');

  if ($el.length > 0) {
    jumpTo($el, offset);
  }

  focusFirstElement(selector);
}

export function jumpTo(element, offset = 0) {
  element = $(element);

  const elOffset = element.offset();
  const bodyPadding = parseInt($('body').css('paddingTop'), 10);
  const scrollPosition = parseInt(elOffset.top, 10) - bodyPadding - offset;

  $('html, body').animate({ scrollTop: scrollPosition }, 300);
}

export function init() {
  $(document).on('click', '[data-jumpto]', smoothScroll);
}
