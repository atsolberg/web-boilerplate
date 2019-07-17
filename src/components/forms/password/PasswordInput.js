import React, { Component } from 'react';
import cx from 'classnames';
import { bool, string } from 'prop-types';
import Popover from 'react-bootstrap/es/Popover';

import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';
import FormLabel from 'react-bootstrap/es/FormLabel';

import { debounce } from '../../../function';

import HtmlId from '../../html-id/HtmlId';
import Fade from '../../transitions/Fade';
import { uuid } from '../../../string';

import styles from './styles';

// Password creation rules.
const rules = [
  { id: 'length', label: '8 character minimum', test: /.{8,}/ },
  { id: 'letter', label: 'At least one letter', test: /[A-Za-z]/g },
  { id: 'number', label: 'At least one number', test: /[0-9]/g }
];

/** Popover placement - one of {'top'|'right'|'bottom'|'left'} */
const getPlacement = () => (window.outerWidth >= 1025 ? 'right' : 'bottom');

/**
 * A tooltip to show the password rules
 * and if they have been met.
 */
class Tooltip extends Component {
  static propTypes = {
    password: string.isRequired
  };

  state = {
    placement: getPlacement()
  };

  componentDidMount() {
    $(window).on(
      'resize',
      debounce(() => {
        this.setState({ placement: getPlacement() });
      }, 20)
    );
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  render() {
    const { password } = this.props;
    const { placement } = this.state;

    return (
      <Popover
        id="password-rules-tt"
        title="Password must have:"
        className="order-acct-pw-tt"
        placement={placement}
      >
        <ul className="list-unstyled order-acct-pw-rules">
          {rules.map((r) => (
            <li key={r.id}>
              <i
                className={cx('tt-image fa', {
                  'fa-check': password.match(r.test),
                  'fa-times': !password.match(r.test)
                })}
              />
              <div className="tt-label">{r.label}</div>
            </li>
          ))}
        </ul>
      </Popover>
    );
  }
}

/**
 * A component that renders a bootstrap form group with a password input.
 * Supports error/validation visualization.
 */
class PasswordInput extends Component {
  static propTypes = {
    showErrorMessaging: bool,
    tooltips: bool
  };

  static defaultProps = {
    showErrorMessaging: true,
    tooltips: true
  };

  errorDescriptor = uuid();

  state = {
    peak: false,
    focused: false
  };

  isPasswordValid = () => {
    const { value } = this.props;
    return rules.every((rule) => value.match(rule.test));
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ focused: true });
    if (onFocus) onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.setState({ focused: false });
    if (onBlur) onBlur();
  };

  onPeak = () => {
    this.setState((prevState) => ({
      peak: !prevState.peak
    }));
  };

  onKeyPress = (e) => {
    const { onKeyPress } = this.props;
    const valid = this.isPasswordValid();

    if (onKeyPress) onKeyPress(e, valid);
  };

  render() {
    const {
      label,
      id,
      desc,
      value,
      error,
      showErrorMessaging,
      tooltips,
      inputRef,
      required,
      onFocus,
      onBlur,
      children,
      'aria-describedby': ariaDescribedby,
      ...rest
    } = this.props;

    const { peak, focused } = this.state;

    const valid = this.isPasswordValid();
    const showHints = tooltips && value.length > 0 && !valid && focused;
    const passwordOrText = peak === true ? 'text' : 'password';

    const dynamicAttrs = { ...rest };

    const describers = [];
    const showError = error && showErrorMessaging;

    if (ariaDescribedby) describers.push(ariaDescribedby);
    if (showError) describers.push(this.errorDescriptor);

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
            css={styles}
            className={cx({
              'has-error': !!error,
              'has-tooltip': tooltips,
              peak
            })}
            controlId={htmlId}
          >
            {required && <span className="required-label">*</span>}
            {label && <FormLabel>{label}</FormLabel>}
            {desc && <div className="control-desc"> {desc}</div>}

            <div className="form-control-wrapper">
              <FormControl
                type={passwordOrText}
                value={value}
                inputRef={inputRef || ((c) => (this.input = c))}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onKeyPress={this.onKeyPress}
                required
                {...dynamicAttrs}
              />
              <i className="fa fa-eye pass-peak" onClick={this.onPeak} />
              <Fade in={showHints} enter={225} exit={195} unmountOnExit>
                <Tooltip password={value} />
              </Fade>
            </div>
            {children}
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

export default PasswordInput;
