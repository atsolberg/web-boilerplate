import { css } from '@emotion/core';
import {
  primary,
  gray_dark,
  black
} from '../../../styles/variables-export.scss';

const styles = css`
  label {
    display: flex;
    padding-left: 0;
  }
  input {
    opacity: 0;
  }
  input + .radio-button::before {
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid ${gray_dark};
    content: '';
    cursor: pointer;
    display: inline-block;
    height: 20px;
    margin-right: 8px;
    position: relative;
    text-align: center;
    top: 2px;
    transition: all 250ms ease;
    vertical-align: top;
    width: 20px;
  }

  input:checked + .radio-button::before {
    background-color: ${primary};
    border-color: ${primary};
    box-shadow: inset 0 0 0 4px #fff;
  }

  input:focus:checked + .radio-button::before {
    background-color: ${primary};
  }

  &.disabled label {
    color: ${black};
  }

  input:disabled + .radio-button::before {
    background-color: ${gray_dark};
    border-color: ${gray_dark};
    box-shadow: inset 0 0 0 4px #fff;
    border: 1px solid ${gray_dark};
    cursor: not-allowed;
  }

  &.busy {
    .input-spinner {
      position: absolute;
      top: 0;
      left: -2px;
    }
    input + .radio-button::before {
      opacity: 0;
    }
  }
`;

export default styles;
