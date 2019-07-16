import { css } from '@emotion/core';

import { brandColorSecondaryBlue } from '../../styles/variables-export.scss';

const styles = css`
  &.sorting-header:hover {
    cursor: pointer;
  }
  &.sorting-header .fa {
    color: ${brandColorSecondaryBlue};
  }
  &.sorting-header:not(.active) .fa {
    visibility: hidden;
  }
  &.sorting-header:not(.active):hover .fa {
    visibility: visible;
  }
`;

export default styles;
