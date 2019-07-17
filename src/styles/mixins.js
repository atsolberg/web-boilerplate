import { css } from '@emotion/core';
import { transparentize } from 'polished';

import { primary } from './variables-export.scss';
import { tablet } from './breakpoints';

/* ============================================================

    Defines some additional mixins not already in bootstraps
    mixins.

    TABLE OF CONTENTS

    MISC
    GRADIENTS
    POSITIONING
    BACKGROUNDS
    GRID

   ============================================================ */

/* ============================================================
   MISC
   ============================================================ */

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
   GRADIENTS
   ============================================================ */

// Horizontal gradient, from left to right
//
// Creates two color stops, start and end, by specifying a color and position for each color stop.
export const gradientHorizontal = (
  startColor = '#555',
  endColor = '#333',
  startPercent = '0%',
  endPercent = '100%'
) => `
  background-image: linear-gradient(to right, ${startColor} ${startPercent}, ${endColor} ${endPercent});
  background-repeat: repeat-x;
`;

// Vertical gradient, from top to bottom
//
// Creates two color stops, start and end, by specifying a color and position for each color stop.
export const gradientVertical = (
  startColor = '#555',
  endColor = '#333',
  startPercent = '0%',
  endPercent = '100%'
) => `
  background-image: linear-gradient(to bottom, ${startColor} ${startPercent}, ${endColor} ${endPercent});
  background-repeat: repeat-x;
`;

export const gradientDirectional = (
  startColor = '#555',
  endColor = '#333',
  deg = '45deg'
) => `
  background-repeat: repeat-x;
  background-image: linear-gradient(${deg}, ${startColor}, ${endColor});
`;
export const gradientHorizontalThreeColors = (
  startColor = '#00b3ee',
  midColor = '#7a43b6',
  colorStop = '50%',
  endColor = '#c3325f'
) => `
  background-image: linear-gradient(to right, ${startColor}, ${midColor} ${colorStop}, ${endColor});
  background-repeat: no-repeat;
`;
export const gradientVerticalThreeColors = (
  startColor = '#00b3ee',
  midColor = '#7a43b6',
  colorStop = '50%',
  endColor = '#c3325f'
) => `
  background-image: linear-gradient(${startColor}, ${midColor} ${colorStop}, ${endColor});
  background-repeat: no-repeat;
`;
export const gradientRadial = (innerColor = '#555', outerColor = '#333') => `
  background-image: radial-gradient(circle, ${innerColor}, ${outerColor});
  background-repeat: no-repeat;
`;
export const gradientStriped = (
  color = 'rgba(255,255,255,.15)',
  angle = '45deg'
) => `
  background-image: linear-gradient(${angle}, ${color} 25%, transparent 25%, transparent 50%, ${color} 50%, ${color} 75%, transparent 75%, transparent);
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
  bgcolor = primary,
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
