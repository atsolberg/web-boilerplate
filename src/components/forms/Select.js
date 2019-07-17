import React, { Component } from 'react';
import cx from 'classnames';
import FormLabel from 'react-bootstrap/es/FormLabel';
import FormGroup from 'react-bootstrap/es/FormGroup';

import { rif } from '../../jsx';

import HtmlId from '../html-id/HtmlId';

/**
 * A component that renders a bootstrap form group with a select input.
 * Supports error/validation visualization.
 */
class Select extends Component {
  render() {
    const {
      className,
      children,
      desc,
      error,
      id,
      label,
      required,
      showErrorMessaging,
      'aria-describedby': ariaDescribedby = this.ariaDescribedby,
      groupClasses,
      options,
      inputRef,
      ...rest
    } = this.props;

    const dynamicAttrs = { 'aria-describedby': ariaDescribedby, ...rest };

    return (
      <HtmlId id={id}>
        {(htmlId) => (
          <FormGroup
            className={cx(groupClasses, { 'has-error': !!error })}
            controlId={htmlId}
          >
            {label && (
              <>
                {required && <span className="required-label">*</span>}
                <FormLabel>{label}</FormLabel>
                {desc && <div className="control-desc">{desc}</div>}
              </>
            )}
            <select
              id={htmlId}
              className={cx('form-control', className)}
              ref={inputRef || ((c) => (this.input = c))}
              {...dynamicAttrs}
            >
              {options &&
                options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              {children}
            </select>
            {rif(
              error && showErrorMessaging,
              <p
                className="error-message"
                dangerouslySetInnerHTML={{ __html: error }}
                id={ariaDescribedby}
                role="alert"
              />
            )}
          </FormGroup>
        )}
      </HtmlId>
    );
  }
}

export default Select;
