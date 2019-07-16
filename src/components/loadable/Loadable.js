import React from 'react';
import { bool, string, number, node, oneOfType } from 'prop-types';
import cx from 'classnames';

import LoadingBars from '../icons/LoadingBars';

/**
 * Renders children normally, unless `loading` is true, then it
 * will display a loading indicator.
 */
const Loadable = ({
  className,
  children,
  loading,
  elem,
  copy = 'Loading...',
  width = '40'
}) => {
  const Elem = elem || 'div';

  if (loading) {
    return (
      <Elem className={cx(className, 'tac padded-lg')}>
        <LoadingBars width={width} /> <em>{copy}</em>
      </Elem>
    );
  }

  return <Elem>{children}</Elem>;
};
Loadable.propTypes = {
  loading: bool.isRequired,
  elem: string, // html element wrapper, i.e. 'div' or 'span'.
  copy: node, // content next to loading icon, default: 'Loading...'
  width: oneOfType([string, number])
};

export default Loadable;
