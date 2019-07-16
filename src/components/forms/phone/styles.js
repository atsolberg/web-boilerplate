import { css } from '@emotion/core';
import {
  brandColorSecondaryBlue,
  globalColorErrorRed
} from '../../../styles/variables-export.scss';

const styles = css`
  .form-control {
    transition: border 100ms ease;
  }

  &.has-error {
    .form-control {
      border: 1px solid ${globalColorErrorRed};
      transition: border 100ms ease;
    }

    .error-message {
      margin-top: 8px;
    }

    label {
      color: ${globalColorErrorRed};
    }
  }

  &.has-focus {
    .form-control {
      border: 1px solid ${brandColorSecondaryBlue};
      transition: border 100ms ease;
    }
  }
`;

export default styles;
