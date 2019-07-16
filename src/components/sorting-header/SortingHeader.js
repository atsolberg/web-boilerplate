import React from 'react';
import cx from 'classnames';
import { string, object, func } from 'prop-types';
import cookie from '../../cookie';

import styles from './styles';

/**
 * Produces a table header with sorting indicator.
 */
function SortingHeader({
  property,
  sorting: { by, dir },
  onClick,
  label,
  saveAs,
  className,
  ...rest
}) {
  return (
    <th
      css={styles}
      className={cx(className, 'sorting-header', {
        active: by === property
      })}
      onClick={(e) => {
        onClick(e);
        if (saveAs) {
          cookie.set('sorting', saveAs, { by: property, dir });
        }
      }}
      {...rest}
    >
      <i className={cx(`fa fa-angle-${dir === 'asc' ? 'up' : 'down'}`)} />{' '}
      {label}
    </th>
  );
}
SortingHeader.propTypes = {
  label: string.isRequired,
  property: string.isRequired,
  sorting: object.isRequired,
  onClick: func.isRequired,
  saveAs: string // Cookie value to save choice
};

export default SortingHeader;
