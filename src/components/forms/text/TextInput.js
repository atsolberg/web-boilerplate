import React, { useRef } from 'react';
import {
  node,
  oneOfType,
  func,
  string,
  bool,
  oneOf,
  any,
  shape
} from 'prop-types';
import cx from 'classnames';

import FormLabel from 'react-bootstrap/es/FormLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

import HtmlId from '../../html-id/HtmlId';

import { uuid } from '../../../string';
import styles from './styles';

function TextInput({
  type = 'text',
  desc,
  error,
  id,
  label,
  required = false,
  showErrorMessaging = true,
  'aria-describedby': ariaDescribedby,
  groupClasses,
  children,
  ...rest
}) {
  const errorDescriptorRef = useRef(uuid());

  const describers = [];
  const showError = error && showErrorMessaging;

  if (ariaDescribedby) describers.push(ariaDescribedby);
  if (showError) describers.push(errorDescriptorRef.current);

  const dynamicAttrs = { ...rest };

  if (describers.length) {
    dynamicAttrs['aria-describedby'] = describers.join(' ');
  }

  if (error) {
    dynamicAttrs['aria-invalid'] = true;
  }

  return (
    <HtmlId id={id}>
      {(htmlId) => (
        <FormGroup
          className={cx(groupClasses, { 'has-error': !!error })}
          css={styles}
          controlId={htmlId}
        >
          {label && (
            <>
              {required && <span className="required-label">*</span>}
              <FormLabel>{label}</FormLabel>
              {desc && <div className="control-desc">{desc}</div>}
            </>
          )}
          <FormControl type="text" required={required} {...dynamicAttrs} />
          {children}
          <p
            className={cx('error-message', {
              hide: !showError
            })}
            dangerouslySetInnerHTML={{ __html: error }}
            id={errorDescriptorRef.current}
            role="alert"
            aria-atomic
          />
        </FormGroup>
      )}
    </HtmlId>
  );
}
TextInput.propTypes = {
  type: oneOf(['text', 'number', 'email', 'search']),
  desc: node,
  label: node,
  id: string,
  error: string,
  required: bool,
  inputRef: oneOfType([func, shape({ current: any })]),
  showErrorMessaging: bool
};

export default TextInput;
