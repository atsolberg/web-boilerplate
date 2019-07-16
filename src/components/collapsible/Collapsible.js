import React, { useState } from 'react';
import cx from 'classnames';

function Collapsible({ title, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const icon = collapsed ? 'fa-plus' : 'fa-minus';

  return (
    <div className={cx('collapsible', { collapsed })}>
      <div className="cp" onClick={() => setCollapsed(!collapsed)}>
        {title}
        <button type="button" className="btn btn-link pull-right">
          <i className={`fa ${icon}`} />
        </button>
      </div>
      <div className="collapsible-body">{children}</div>
    </div>
  );
}

export default Collapsible;
