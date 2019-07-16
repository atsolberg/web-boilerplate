import { css } from '@emotion/core';
import { desktop, mobile } from '../../styles/breakpoints';

import {
  globalColorLightGrey,
  globalColorGrey,
  globalColorDarkGrey,
  globalColorBlack,
  borderRadiusBase,
  brandColorSecondaryBlue
} from '../../styles/variables-export.scss';

const styles = {
  radioList: css`
    padding-left: 0;
    list-style: none;
    margin: 0;

    ${mobile} {
      &.-side-scroll {
        white-space: nowrap;
        overflow: auto;
      }
    }

    li {
      display: inline-block;
      margin-bottom: 12px;
      &:not(:last-child) {
        margin-right: 12px;
      }

      label {
        font-weight: inherit;
        border: 1px solid ${globalColorGrey};
        &:focus {
          border-color: ${brandColorSecondaryBlue};
          outline: none;
        }
        border-radius: ${borderRadiusBase};
        padding: 12px 16px;
        line-height: 1.3;
        cursor: pointer;
        margin-bottom: 0;
        text-align: center;

        input {
          display: none;
        }

        ${desktop} {
          padding-top: 8px;
          padding-bottom: 8px;
        }
      }

      &.active label {
        border: 2px solid #000;
        padding: 11px 15px;

        ${desktop} {
          padding-top: 7px;
          padding-bottom: 7px;
        }
      }

      &.unavailable label {
        background-color: ${globalColorLightGrey};
        text-decoration: line-through;
        color: ${globalColorDarkGrey};
      }
      &.unavailable.active label {
        border-color: ${globalColorDarkGrey};
      }
    }

    ${mobile} {
      &.-scrunched {
        li {
          margin-right: 8px;
        }
      }
    }
  `,

  iconRadioList: css`
    li label {
      min-width: 88px;

      &.unavailable {
        color: ${globalColorLightGrey};
      }

      img {
        display: block;
        height: 30px;
        margin: 11px auto;
      }
    }
  `,

  expander: css`
    color: ${globalColorBlack};
    text-decoration: underline;
    font-size: 14px;
    border: none;
    background-color: #fff;

    .caret {
      margin-left: 6px;
      transition: all 0.2s ease;
    }
    &.-expanded .caret {
      transform: rotate(180deg);
    }
  `
};

export default styles;
