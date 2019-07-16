import React, { useState } from 'react';
import { uuid } from '../../string';

/**
 * Render-Prop component that produces an id for it's contents if one is not
 * provided. A generated id will be different for each instance, but will
 * stay through multiple render calls.
 */
function HtmlId({ id, prefix, children, render = children }) {
  // Just use the real id or make one if need be.
  const [derivedId] = useState(id || `${prefix || 'id'}-${uuid()}`);
  return render(derivedId);
}

export default HtmlId;
