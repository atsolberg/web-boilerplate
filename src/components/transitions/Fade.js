import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import { Global } from '@emotion/core';

/**
 * A css transition to do a fade in and out.
 * NOTE: using non-default timing (500 in, and 300 out) will require new css.
 * See https://reactcommunity.org/react-transition-group/css-transition
 */
function Fade({ classNames, children, enter = 500, exit = 300, ...rest }) {
  let timingClass = 'fade-in-out';
  let timingStyles = null;

  if (enter !== 500 || exit !== 300) {
    // Define some custom fade timing
    timingClass = `fade-in-out-${enter}-${exit}`;
    timingStyles = (
      <Global
        styles={{
          [`.${timingClass}-enter`]: { opacity: 0.01 },
          [`.${timingClass}-enter.${timingClass}-enter-active`]: {
            opacity: 1,
            transition: `opacity ${enter}ms ease-in`,
          },
          [`.${timingClass}-exit`]: { opacity: 1 },
          [`.${timingClass}-exit.${timingClass}-exit-active`]: {
            opacity: 0.01,
            transition: `opacity ${exit}ms ease-in`,
          },
        }}
      />
    );
  }

  return (
    <Fragment>
      {timingStyles}
      <CSSTransition
        classNames={cx(timingClass, classNames)}
        timeout={{ enter, exit }}
        {...rest}
      >
        {children}
      </CSSTransition>
    </Fragment>
  );
}

export default Fade;
