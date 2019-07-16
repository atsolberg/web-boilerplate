import { css } from '@emotion/core';
import { globalColorDarkGrey } from '../../../styles/variables-export.scss';

const styles = css`
  label + span.help-block {
    display: block;
    margin-left: 0;
  }

  textarea {
    transition: border 100ms ease;
  }

  &.has-error .form-control:focus,
  textarea:focus {
    box-shadow: none;
    transition: border 100ms ease;
  }

  span.secondary-description {
    color: ${globalColorDarkGrey};
    float: right;
  }

  .error-message {
    margin-top: 8px;
  }
`;

export default styles;
