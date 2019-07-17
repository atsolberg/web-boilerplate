import React from 'react';
import cx from 'classnames';
import { string, bool } from 'prop-types';
import RbsCheckbox from 'react-bootstrap/es/FormCheck';
import FormGroup from 'react-bootstrap/es/FormGroup';

import HtmlId from '../../html-id/HtmlId';
import Spinner from '../../spinner/Spinner';

import styles from './styles';

/**
 * A component that renders a bootstrap form group with a checkbox input.
 * REMINDER: checkbox inputs use 'checked' instead of 'value'.
 */
function Checkbox({
  id,
  children,
  disabled,
  error,
  busy,
  wrapperClasses,
  ...rest
}) {
  return (
    <HtmlId id={id}>
      {(htmlId) => (
        <FormGroup
          className={cx({ 'has-error': error, busy }, wrapperClasses)}
          css={styles}
          controlId={htmlId}
        >
          <RbsCheckbox disabled={disabled || busy} {...rest}>
            {busy && (
              <div className="input-spinner">
                <Spinner className="fa-lg" />
              </div>
            )}
            <div className="input-checkmark" />
            {children}
          </RbsCheckbox>
        </FormGroup>
      )}
    </HtmlId>
  );
}
Checkbox.propTypes = {
  id: string,
  busy: bool,
  disabled: bool,
  error: bool
};

export default Checkbox;
