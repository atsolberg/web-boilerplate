import {
  screenSmMin,
  screenDesktop,
  screenLgMin,
  screenXsMax,
  screenSmMax,
  screenLgMin
} from './variables-export.scss';

export const tablet = `@media (min-width: ${screenSmMin})`;
export const desktop = `@media (min-width: ${screenDesktop})`;
export const desktopLg = `@media (min-width: ${screenLgMin})`;
export const mobile = `@media (max-width: ${screenXsMax})`;
export const smDown = `@media (max-width: ${screenSmMax})`;
export const maxDesktopLg = `@media (max-width: ${screenLgMin})`;
