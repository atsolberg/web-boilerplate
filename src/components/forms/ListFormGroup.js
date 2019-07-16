import React from 'react';
import cx from 'classnames';
import { oneOfType, node, string } from 'prop-types';

/**
 * Renders of form group for a collection of inputs, like a list of
 * radio buttons or checkbox.  Uses a fieldset and legend which are
 * more ADA compliant when labeling a list of options.
 */
const ListFormGroup = ({
  label,
  className,
  style = null,
  children,
  ...rest
}) => (
  <fieldset className={cx('form-group', className)} css={style} {...rest}>
    <legend>{label}</legend>
    {children}
  </fieldset>
);
ListFormGroup.displayName = 'ListFormGroup';
ListFormGroup.propTypes = {
  label: oneOfType([string, node]).isRequired
};

export default ListFormGroup;
