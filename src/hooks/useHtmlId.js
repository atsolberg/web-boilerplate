import { useState } from 'react';
import { uuid } from '../string';

function useHtmlId(providedId) {
  const [htmlId] = useState(providedId || uuid());

  return htmlId;
}

export default useHtmlId;
