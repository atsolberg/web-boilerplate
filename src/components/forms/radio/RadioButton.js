import React from 'react';
import cx from 'classnames';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Radio from 'react-bootstrap/es/Radio';

import HtmlId from '../../html-id/HtmlId';
import Spinner from '../../spinner/Spinner';

import styles from './styles';

function RadioButton({
  busy,
  children,
  disabled,
  id,
  className,
  error,
  ...rest
}) {
  return (
    <HtmlId id={id}>
      {(htmlId) => (
        <FormGroup className={cx({ 'has-error': !!error })} controlId={htmlId}>
          <Radio
            disabled={disabled || busy}
            css={styles}
            className={cx(className, { busy })}
            {...rest}
          >
            <span className="radio-button " />
            {busy && (
              <div className="input-spinner">
                <Spinner className="fa-lg" />
              </div>
            )}
            <div className="radio-label">{children}</div>
          </Radio>
        </FormGroup>
      )}
    </HtmlId>
  );
}

export default RadioButton;
