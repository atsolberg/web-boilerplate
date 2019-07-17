import { css } from '@emotion/core';

import {
  gray_dark,
  black
} from '../../styles/variables-export.scss';

const styles = css`
  &.stepper {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin: 12px 10px 0 0;
  }

  .stepper-btn {
    border: none;
    display: inline-block;
    background: transparent;
    height: 24px;

    &[disabled] {
      color: ${gray_dark};
    }
    &.-decrease {
      padding-left: 0;
    }
  }

  .stepper-text {
    color: ${black};
    display: inline-block;
    font-size: 14px;
    margin: 0 6px;
  }
`;

export default styles;
