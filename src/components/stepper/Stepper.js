import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const { func, number, string } = PropTypes;

/**
 * Quantity stepper control.
 * @param {string} [label] - a label next to the value.
 * @param {number} value - the current value of the stepper.
 * @param {function} onChange - onChange event handler.
 * @param {string} [className] - wrapper css class name.
 * @param {boolean} [disabled] - if true, both buttons are disabled.
 */
const Stepper = ({ label, value, onChange, className, disabled, ...rest }) => {
  const update = (inc) => {
    const qty = inc ? value + 1 : value - 1;
    onChange(qty);
  };

  const decrease = {
    onClick: () => update(false),
    disabled: value < 2 || disabled
  };

  const increase = {
    onClick: () => update(true),
    disabled
  };

  return (
    <div css={styles} className={cx(className, 'stepper')} {...rest}>
      <button type="button" className="stepper-btn -decrease" {...decrease}>
        <i className="fa fa-minus" />
      </button>
      <span className="stepper-text">
        {label && <span className="stepper-label">{label}&nbsp;</span>}
        <span className="stepper-value">{value}</span>
      </span>
      <button type="button" className="stepper-btn" {...increase}>
        <i className="fa fa-plus" />
      </button>
    </div>
  );
};
Stepper.propTypes = {
  label: string,
  value: number.isRequired,
  onChange: func.isRequired,
  className: string
};

export default Stepper;
