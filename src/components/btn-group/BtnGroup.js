import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const { arrayOf, shape, string, number, func, oneOfType } = PropTypes;

/**
 * Renders a bs btn group with buttons for each option provided.
 */
const BtnGroup = ({ options, selected, onSelect, className, ...rest }) => (
  <div className={cx(className, 'btn-group')} {...rest}>
    {options.map(o => (
      <button
        type="button"
        key={o.value}
        className={cx('btn', 'btn-default', {
          active: o.value === selected,
        })}
        onClick={() => onSelect(o.value)}
      >
        {o.label}
      </button>
    ))}
  </div>
);

BtnGroup.displayName = 'BtnGroup';
BtnGroup.propTypes = {
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: oneOfType([string, number]).isRequired,
    })
  ).isRequired,
  selected: oneOfType([string, number]).isRequired,
  onSelect: func.isRequired,
};

export default BtnGroup;
