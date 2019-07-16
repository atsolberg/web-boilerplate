import React, { Component } from 'react';
import cx from 'classnames';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';
import HelpBlock from 'react-bootstrap/es/HelpBlock';

import { string, bool, node, number } from 'prop-types';
import { rif } from '../../../jsx';

import HtmlId from '../../html-id/HtmlId';

import styles from './styles';

/**
 * A component that renders a bootstrap form group with a textarea.
 * Supports error/validation visualization.
 */
function TextArea({
  label,
  maxLength,
  id,
  desc,
  error,
  showErrorMessaging = true,
  required,
  children,
  ...rest
}) {
  const provided = {};
  let helpText;

  // Only include props that we pulled out if they were passed in.
  if (maxLength) {
    provided.maxLength = maxLength;
    helpText = `Maximum of ${maxLength} characters`;
  } else {
    helpText = desc;
  }

  return (
    <HtmlId id={id}>
      {(htmlId) => (
        <FormGroup
          className={cx({ 'has-error': !!error })}
          css={styles}
          controlId={htmlId}
        >
          {label && (
            <>
              <ControlLabel>
                {required && <span className="required-label">*</span>}
                {label}
              </ControlLabel>
              {helpText && <HelpBlock>{helpText}</HelpBlock>}
            </>
          )}
          <FormControl componentClass="textarea" {...provided} {...rest} />
          {children}
          {rif(
            error && showErrorMessaging,
            <p
              className="error-message"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
        </FormGroup>
      )}
    </HtmlId>
  );
}
TextArea.propTypes = {
  label: string,
  value: string,
  maxLength: number,
  id: string,
  className: string,
  desc: string,
  error: string,
  wrapperClasses: string,
  showErrorMessaging: bool,
  required: bool,
  children: node
};

export default TextArea;
