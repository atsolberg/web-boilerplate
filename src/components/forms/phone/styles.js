import { css } from '@emotion/core';
import {
  primary,
  danger
} from '../../../styles/variables-export.scss';

const styles = css`
  .form-control {
    transition: border 100ms ease;
  }

  &.has-error {
    .form-control {
      border: 1px solid ${danger};
      transition: border 100ms ease;
    }

    .error-message {
      margin-top: 8px;
    }

    label {
      color: ${danger};
    }
  }

  &.has-focus {
    .form-control {
      border: 1px solid ${primary};
      transition: border 100ms ease;
    }
  }
`;

export default styles;
