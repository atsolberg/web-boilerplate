import { css } from '@emotion/core';
import { danger } from '../../../styles/variables-export.scss';

const styles = css`
  label {
    margin-bottom: 8px;
  }
  label + .help-block {
    display: inline-block;
    margin-left: 5px;
  }

  .error-message {
    color: ${danger};
  }

  span.required-label {
    color: ${danger};
  }

  input {
    transition: border 100ms ease;
  }

  &.has-error .form-control:focus,
  input:focus {
    box-shadow: none;
    transition: border 100ms ease;
  }

  .error-message {
    margin-top: 8px;
  }
`;

export default styles;
