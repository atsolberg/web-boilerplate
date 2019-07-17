import React from 'react';

import TextInput from './text/TextInput';

/**
 * A component that renders a bootstrap form group with a zip code number input.
 */
function ZipInput({
  label,
  id,
  error,
  required,
  children,
  showErrorMessaging = true,
  ...rest
}) {
  return (
    <TextInput
      id={id}
      label={label}
      error={error}
      pattern={'\\d{1,5}'}
      required={required}
      showErrorMessaging={showErrorMessaging}
      {...rest}
    >
      {children}
    </TextInput>
  );
}

export default ZipInput;
