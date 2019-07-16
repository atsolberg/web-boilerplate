import React from 'react';
import { bool, string, node, number, oneOfType } from 'prop-types';

import LoadingBars from '../icons/LoadingBars';

/**
 * Renders children normally, but applies a semi-transparent div on top
 * when loading to block clicks on the wrapped content.
 * Useful to prevent clicks on a large area when 'saving'.
 */
const LoadableGlass = ({
  loading = false,
  spinner = false,
  width = '40',
  copy = '',
  children
}) => (
  <div className="loadable">
    {children}
    {loading && (
      <div className="loadable-glass">
        {spinner ? (
          <i className="fa fa-circle-o-notch fa-spin" />
        ) : (
          <LoadingBars width={width} />
        )}
        {copy && <em className="copy">&nbsp;{copy}</em>}
      </div>
    )}
  </div>
);
LoadableGlass.displayName = 'LoadableGlass';
LoadableGlass.propTypes = {
  loading: bool.isRequired,
  spinner: bool.isRequired,
  width: oneOfType([string, number]),
  copy: string,
  children: node
};

export default LoadableGlass;
