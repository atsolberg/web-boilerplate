import React, { useState } from 'react';
import cx from 'classnames';

/**
 * Renders children normally, unless `excerpt` is true, then it
 * will use a max height, fade out the rest, and show a 'continue'
 * control that when clicked, reveals the rest.
 * Supports mobile only behavior.
 */
function Mask({
  excerpt, // should we even try
  copy = 'Continue Reading',
  mobile = false, // excerpt for mobile only
  className = '',
  children
}) {
  const [expanded, setExpanded] = useState(false);

  const flavor = mobile ? 'm-maskable' : 'maskable';

  const classes = cx(className, { [flavor]: excerpt, unmasked: expanded });

  return (
    <div className={classes}>
      {children}
      {excerpt && !expanded && (
        <div className="maskable-mask">
          <div className="maskable-mask-fade" />
          <a onClick={() => setExpanded(true)}>{copy}</a>
        </div>
      )}
    </div>
  );
}

export default Mask;
