import React from 'react';
import cx from 'classnames';

/**
 * Font-awesome notched circle outline that spins.
 */
const Spinner = ({ className = '', ...rest }) => (
  <i className={cx(className, 'fa fa-circle-o-notch fa-spin')} {...rest} />
);

export default Spinner;
