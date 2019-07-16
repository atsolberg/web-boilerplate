import React from 'react';
import cx from 'classnames';
import { bool, func, string } from 'prop-types';

/**
 * Renders a bs btn group with two 'yes', 'no' buttons.
 * Driven by two radio inputs.
 */
function ToggleInput({ label, name, value, onChange, className }) {
  const inputProps = { onChange };

  if (name) inputProps.name = name;

  return (
    <div className={cx(className, 'form-group')}>
      <label className="control-label">{label}</label>
      <div className="btn-group db clearfix">
        <label
          className={`btn btn-sm btn-default${
            !!value === true ? ' active' : ''
          }`}
        >
          <input
            type="radio"
            value
            checked={!!value === true}
            {...inputProps}
          />
          <span className={!!value === true ? 'text-success' : ''}>Yes</span>
        </label>
        <label
          className={`btn btn-sm btn-default${
            !!value !== true ? ' active' : ''
          }`}
        >
          <input
            type="radio"
            value={false}
            checked={!!value !== true}
            {...inputProps}
          />
          <span className={!!value !== true ? 'text-danger' : ''}>No</span>
        </label>
      </div>
    </div>
  );
}
ToggleInput.propTypes = {
  label: string.isRequired,
  value: bool.isRequired,
  onChange: func.isRequired,
  name: string
};

export default ToggleInput;
