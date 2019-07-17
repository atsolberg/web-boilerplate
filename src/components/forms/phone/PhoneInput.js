import React, { Component } from 'react';
import { node, string, bool, shape, any } from 'prop-types';
import cx from 'classnames';

import FormLabel from 'react-bootstrap/es/FormLabel';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Phone from 'react-phone-number-input';

import HtmlId from '../../html-id/HtmlId';
import { uuid } from '../../../string';

import styles from './styles';

/**
 * A component that renders a bootstrap form group with a phone number input.
 * Supports error/validation visualization.
 */
class PhoneInput extends Component {
  static propTypes = {
    label: node,
    id: string,
    error: string,
    required: bool,
    inputRef: shape({ current: any }),
    showErrorMessaging: bool
  };

  errorDescriptor = uuid();

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };

    // See https://bit.ly/2HhpJkM about refs
    this.input = props.inputRef || React.createRef();
  }

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { focused } = this.state;
    const {
      label,
      id,
      error,
      required,
      showErrorMessaging,
      'aria-describedby': ariaDescribedby,
      inputRef, // to exclude from ...rest
      ...rest
    } = this.props;

    const describers = [];
    const showError = error && showErrorMessaging;

    if (ariaDescribedby) describers.push(ariaDescribedby);
    if (showError) describers.push(this.errorDescriptor);

    const dynamicAttrs = { ...rest };

    if (describers.length) {
      dynamicAttrs['aria-describedby'] = describers.join(' ');
    }

    const elLabel = label ? (
      <FormLabel>
        {required && <span className="required-label">*</span>}
        {label}
      </FormLabel>
    ) : null;

    if (error) {
      dynamicAttrs['aria-invalid'] = true;
    }

    return (
      <HtmlId id={id}>
        {(htmlId) => (
          <FormGroup
            css={styles}
            className={cx({
              'has-error': error,
              'has-focus': focused
            })}
            controlId={id}
          >
            {elLabel}
            <Phone
              className={cx('form-control', { 'has-error': !!error })}
              country="US"
              displayInitialValueAsLocalNumber
              id={htmlId}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              ref={this.input}
              {...dynamicAttrs}
            />
            <p
              className={cx('error-message', {
                hide: !showError
              })}
              dangerouslySetInnerHTML={{ __html: error }}
              id={this.errorDescriptor}
              role="alert"
              aria-atomic
            />
          </FormGroup>
        )}
      </HtmlId>
    );
  }
}

export default PhoneInput;
