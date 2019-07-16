import React from 'react';
import PropTypes from 'prop-types';

import { isDebugMode } from '../../misc';

import Collapsible from '../collapsible/Collapsible';

const { bool, object, string } = PropTypes;

/** Prints out a formatted block of all properties and values in an object. */
const Debug = ({ object: obj, order, title }) => {
  const style = {};
  if (!isDebugMode()) style.display = 'none';

  let keys = Object.keys(obj);
  if (order) keys = keys.sort();

  return (
    <div style={style} className="debuggy">
      {title && <h3>{title}</h3>}
      {keys.map((key) => (
        <pre key={key}>
          <code>
            <Collapsible title={<h4 className="dib">{key}</h4>}>
              {JSON.stringify(obj[key], null, 2)}
            </Collapsible>
          </code>
        </pre>
      ))}
    </div>
  );
};
Debug.displayName = 'SNR.Debug';
Debug.propTypes = {
  object: object.isRequired,
  order: bool,
  title: string
};

export default Debug;
