import React from 'react';
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types';
import styles from './styles';

import Dropdown from 'react-bootstrap/es/Dropdown';
import DropdownToggle from 'react-bootstrap/es/DropdownToggle';
import DropdownMenu from 'react-bootstrap/es/DropdownMenu';
import DropdownItem from 'react-bootstrap/es/DropdownItem';

import useHtmlId from '../../hooks/useHtmlId';

/**
 * Renders a block level paging component showing left aligned
 * paged stats: ('1 - 8 of 551 Reviews') and right aligned sorting control.
 */
const PagingHeader = ({
  id = 'paging-header',
  paging: { page, size, total },
  sorting,
  onSort,
  type
}) => {
  const htmlId = useHtmlId();
  const end = page * size;
  const start = end - (size - 1);
  const current = sorting ? sorting.options.find((o) => o.selected) : null;
  const label = sorting ? (
    <span className="paging-header-current hidden-xs">{current.label}</span>
  ) : null;

  return (
    <div css={styles} id={id}>
      <span className="paging-header-count">
        {start} - {Math.min(end, total)} of {total}
        {type && (
          <>
            {' '}
            <span>{type}</span>
          </>
        )}
      </span>
      {!!sorting && (
        <div className="dib pull-right">
          <label
            htmlFor={htmlId}
            id={`${htmlId}-label`}
            className="selector-label"
          >
            {required && <span className="required-label">*</span>}
            Sort by:
          </label>

          <Dropdown
            id={`${id}-dropdown`}
            className="paging-header-sort"
            onSelect={onSort}
          >
            <DropdownToggle bsStyle="link">{label}</DropdownToggle>
            <DropdownMenu>
              {sorting.options.map((o) => (
                <DropdownItem
                  key={o.value}
                  eventKey={o.value}
                  active={o.value === current.value}
                >
                  {o.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
PagingHeader.propTypes = {
  id: string,
  paging: shape({
    page: number.isRequired,
    size: number.isRequired,
    total: number.isRequired
  }).isRequired,
  sorting: shape({
    dir: oneOf(['asc', 'desc']),
    options: arrayOf(
      shape({
        label: string.isRequired,
        value: string.isRequired,
        selected: bool // only one should be selected
      }).isRequired
    ).isRequired
  }),
  onSort: func,
  type: string // Type of items being paged, i.e. '1 - 10 of 42 <type>'
};

export default PagingHeader;
