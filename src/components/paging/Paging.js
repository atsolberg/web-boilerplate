import React from 'react';
import cx from 'classnames';
import { func, number, shape } from 'prop-types';

import { spacing } from '../../constants';
import styles from './styles';

/**
 * Builds an array of five numbers representing individual page
 * links for paging.
 * @param {number} page - the current page
 * @param {number} totalPages - total number of pages
 * @return {Array} - the paging links numbers
 */
export function buildPaging(page, totalPages) {
  const pages = [];

  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    let rightStop = page + 2;
    if (page < 3) rightStop += Math.min(3, totalPages) - page;

    let leftStop = page - 2;
    if (page > totalPages - 2) leftStop -= page + 2 - totalPages;

    for (let i = page; i > 0 && i >= leftStop; i--) pages.unshift(i);
    for (let i = page + 1; i <= totalPages && i <= rightStop; i++)
      pages.push(i);
  }

  return pages;
}

/**
 * Renders a block level paging component next, prev, first, last links
 * as well as some individual page links.
 */
function Paging({ paging: { page, size, total }, onPage, ...rest }) {
  let hasNext = false;
  let hasPrev = false;
  const totalPages = Math.ceil(total / size);

  if (page !== 1) hasPrev = true;
  if (page !== totalPages) hasNext = true;

  const pages = buildPaging(page, totalPages);
  const hasFirst = pages[0] > 1;
  const hasLast = pages[pages.length - 1] < totalPages;

  return (
    <div css={styles} className="paging" role="region" {...rest}>
      <button
        type="button"
        className={cx('paging-link paging-link--prev btn-link', {
          disabled: !hasPrev
        })}
        onClick={() => onPage(page - 1)}
        disabled={!hasPrev}
      >
        <i className="fa fa-chevron-left" aria-hidden="true" />{' '}
        <span className="paging-link-label">PREV</span>
      </button>
      <button
        type="button"
        className={cx('paging-link paging-link--next btn-link', {
          disabled: !hasNext
        })}
        onClick={() => onPage(page + 1)}
        disabled={!hasNext}
      >
        <span className="paging-link-label">NEXT</span>{' '}
        <i className="fa fa-chevron-right" aria-hidden="true" />
      </button>

      {/* DESKTOP VERSION */}
      <ul className="paging-pages list-inline hidden-xs">
        {hasFirst && [
          <li key="first-link">
            <a className="paging-link" onClick={() => onPage(1)}>
              {1}
            </a>
          </li>,
          <li key="first-dots">{spacing.ellipsis}</li>
        ]}
        {pages.map((p) => {
          if (p === page)
            return (
              <li key={p} aria-current="page">
                {p}
              </li>
            );
          return (
            <li key={p}>
              <a className="paging-link" onClick={() => onPage(p)}>
                {p}
              </a>
            </li>
          );
        })}
        {hasLast && [
          <li key="last-dots">{spacing.ellipsis}</li>,
          <li key="last-link">
            <a className="paging-link" onClick={() => onPage(totalPages)}>
              {totalPages}
            </a>
          </li>
        ]}
      </ul>

      {/* MOBILE VERSION */}
      <ul className="paging-pages list-inline visible-xs">
        {page === totalPages && [
          <li key="first-link-m">
            <a className="paging-link" onClick={() => onPage(1)}>
              {1}
            </a>
          </li>,
          <li key="first-slash">/</li>
        ]}
        <li>{page}</li>
        {page < totalPages && [
          <li key="last-slash">/</li>,
          <li key="last-link-m">
            <a className="paging-link" onClick={() => onPage(totalPages)}>
              {totalPages}
            </a>
          </li>
        ]}
      </ul>
    </div>
  );
}
Paging.propTypes = {
  paging: shape({
    page: number.isRequired,
    size: number.isRequired,
    total: number.isRequired
  }).isRequired,
  onPage: func.isRequired
};

export default Paging;
