import { css } from '@emotion/core';

import {
  primary,
  black,
  gray,
  gray_dark
} from '../../../styles/variables-export.scss';

const styles = css`
  .checkbox {
    padding-left: 8px;
    position: relative;
  }

  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  input ~ .input-checkmark {
    box-shadow: inset 0 0 0 1px ${gray_dark};
    border-radius: 2px;
    height: 16px;
    left: 0;
    position: absolute;
    top: 1px;
    transition: all 100ms ease;
    width: 16px;
  }

  input ~ .input-checkmark::after {
    content: '';
    position: absolute;
    opacity: 0;
    transition: all 100ms ease;
  }

  input:focus ~ .input-checkmark,
  input:active ~ .input-checkmark {
    background-color: ${gray};
    transition: all 100ms ease;
  }

  input:checked ~ .input-checkmark {
    background-color: ${primary};
    box-shadow: none;
    transition: all 100ms ease;
  }

  input:checked:focus ~ .input-checkmark {
    background-color: ${primary};
    transition: all 100ms ease;
  }

  input:checked ~ .input-checkmark::after {
    border: solid #fff;
    border-width: 0 2px 2px 0;
    height: 12px;
    left: 5px;
    opacity: 1;
    top: 0;
    transform: rotate(45deg);
    transition: all 100ms ease;
    width: 6px;
  }

  .disabled label {
    color: ${black};
  }

  .disabled input ~ .input-checkmark {
    background-color: ${gray_dark};
    box-shadow: none;
  }

  &.busy {
    .input-spinner {
      position: absolute;
      top: 0;
      left: -2px;
    }
    input ~ .input-checkmark {
      opacity: 0;
    }
  }
`;

export default styles;
