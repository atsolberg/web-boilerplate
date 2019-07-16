import { css } from '@emotion/core';
import { mobile, tablet, desktop } from '../../../styles/breakpoints';
import { brandColorSecondaryBlue } from '../../../styles/variables-export.scss';

const styles = css`
  .form-control-wrapper {
    min-width: 200px;
    display: block;
    position: relative;
    vertical-align: middle;
    width: 100%;
  }

  .form-control-item {
    display: block;
    margin-top: 12px;
    ${tablet} {
      margin-top: 0;
      display: table-cell;
    }
  }
  .form-control-wrapper .pass-peak {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .form-control-wrapper input {
    padding-right: 42px;
  }

  .forgot-password {
    margin-bottom: 5px;
    display: inline-block;
  }

  ${mobile} {
    button {
      width: 100%;
    }
  }

  &.has-tooltip {
    .order-acct-pw-tt {
      left: 50%;
      transform: translateX(-50%);
      width: 244px;
      top: 100%;

      ${desktop} {
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
      }
    }

    .order-acct-pw-rules {
      margin-bottom: 0;
      li {
        margin-bottom: 5px;
        position: relative;
      }
    }

    .order-acct-pw-rules .tt-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
    }

    .tt-label {
      margin-left: 28px;
    }
  }

  &.peak {
    .pass-peak .fa {
      color: ${brandColorSecondaryBlue};
    }
  }
`;

export default styles;
