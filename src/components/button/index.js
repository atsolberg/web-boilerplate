import React from 'react';
import BsButton from 'react-bootstrap/es/Button';
import Spinner from '../spinner/Spinner';

/**
 * Primary Sleep Number button component.
 */
const Button = ({ label, busy, busyLabel, disabled, children, ...rest }) => {
  const btnLabel = busy && busyLabel ? busyLabel : label || children;

  return (
    <BsButton disabled={busy || disabled} {...rest}>
      {busy && <Spinner className="bump-left-sm" />}
      {btnLabel}
    </BsButton>
  );
};

export default Button;
