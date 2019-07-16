import { css } from '@emotion/core';
import { transparentize } from 'polished';

import variables from './variables';
import { gradientHorizontalThreeColors } from './bs/_gradients';
import { tablet } from './breakpoints';

/* ============================================================

    Defines some additional mixins not already in bootstraps
    mixins.

    TABLE OF CONTENTS

    MISC
    FONTS
    POSITIONING
    BACKGROUNDS
    BORDERS
    GRID

   ============================================================ */

/* ============================================================
   MISC
   ============================================================ */

// Slide In
export const willSlideInHorizontal = () => `
  transform: translateX(100%);
`;

// This stupid but necessary until we update the `a` styles in base.scss
export const linkColor = () => `
  &, &:hover, &:focus, &:active { color: ${variables.brandColorSecondaryBlue}; }
`;

export const clearFix = () => `
  &:before,
  &:after {
    content: '';
    display: table;
  }
  &:after {
    clear: both;
  }
`;

/* ============================================================
   POSITIONING
   ============================================================ */

// Translate the block to the center vertically
// and horizontally.
export const centerBlock = () => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// Translate the block to the center vertically
// and set the `left` or `right` if provided.
export const vCenterBlock = (left, right) => css`
  position: absolute;
  ${typeof left !== 'undefined' && `left: ${left};`} ${typeof right !==
    'undefined' && `right: ${right};`}
  top: 50%;
  transform: translateY(-50%);
`;

// Translate the block to the center horizontally
// and set the `top` if provided.
export const hCenterBlock = (top) => `
  position: absolute;
  ${typeof type !== 'undefined' && `top: ${top}`}
  left: 50%;
  transform: translateX(-50%);
`;

/* ============================================================
   BACKGROUNDS
   ============================================================ */

export const bgCenterCover = (img) => `
  background: url(${img}) no-repeat center center scroll;
  background-size: cover;
`;

export const bgGradient = (
  bgcolor = variables.brandColorSecondaryBlue,
  transparency = '.50'
) => `
  background-color: ${bgcolor};
  ${gradientHorizontalThreeColors(
    bgcolor,
    transparentize(transparency, bgcolor),
    bgcolor
  )}
`;

/* ============================================================
   BORDERS
   ============================================================ */

export const borderTail = (color, height = '18px', width = '15px') => `
  content:'';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: solid ${height} ${color};
  border-left: solid ${width} transparent;
  border-right: solid ${width} transparent;
  z-index: 1;
`;

export const noOutline = () => `
 &.active.focus, &.active:focus,
 &:active.focus, &:active:focus,
 &.focus, &:focus {
    outline: none !important;
  }
`;

export const shadow = () => `
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .24);
`;

/* ============================================================
   GRID
   ============================================================ */

const cssGrid = css`
  display: -ms-grid;
  display: grid;
  margin-left: -15px;
  margin-right: -15px;
`;

// 2 Columns: 1 * 10px gap / 2 cols = 5px smaller per col
const twoColWidth = 'calc(50% - 5px)';

export const cssTwoColGrid = css`
  ${cssGrid};
  grid-template-columns: repeat(2, ${twoColWidth});
  -ms-grid-columns: ${twoColWidth} ${twoColWidth};
  grid-column-gap: 10px;
`;

// 3 Columns: 2 * 9px gap / 3 cols = 6px smaller per col
const threeColWidth = 'calc(33.3333% - 6px)';

export const cssThreeColGrid = css`
  ${cssGrid};
  grid-template-columns: repeat(3, ${threeColWidth});
  -ms-grid-columns: ${threeColWidth} ${threeColWidth} ${threeColWidth};
  grid-column-gap: 9px;
`;

/**
 * Grid items have to be immediate children of grids.
 * `display: contents` treats a container as though it weren't there
 * in supported browsers (not IE or Edge)
 */
export const cssGridItemsHolder = css`
  display: contents;
`;

export const cssGridItem = css`
  display: block;
  padding-left: 15px;
  padding-right: 15px;
`;

export const cssGridCoords = (row, col, rowSpan = 1, colSpan = 1) => css`
  ${cssGridItem};
  grid-row-start: ${row};
  grid-row-end: ${row + rowSpan};
  grid-column-start: ${col};
  grid-column-end: ${col + colSpan};
  -ms-grid-row: ${row};
  -ms-grid-row-span: ${rowSpan};
  -ms-grid-column: ${col};
  -ms-grid-column-span: ${colSpan};
`;

export const cssTabletGridCoords = (row, col, rowSpan, colSpan) => css`
  ${tablet} {
    ${cssGridCoords(row, col, rowSpan, colSpan)};
  }
`;

export const msOnlyGridCoords = (row, col, rowSpan = 1, colSpan = 1) => css`
  // Prefixed grid properties for IE11
  -ms-grid-row: ${row};
  -ms-grid-row-span: ${rowSpan};
  -ms-grid-column: ${col};
  -ms-grid-column-span: ${colSpan};

  // Edge supports grid properties with no prefix, but not display:contents;
  @supports not (display: contents) {
    grid-row-start: ${row};
    grid-row-end: ${row + rowSpan};
    grid-column-start: ${col};
    grid-column-end: ${col + colSpan};
  }
`;

export const msOnlyTabletGridCoords = (row, col, rowSpan, colSpan) => css`
  ${tablet} {
    ${msOnlyGridCoords(row, col, rowSpan, colSpan)};
  }
`;
