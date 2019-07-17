import {
  screen_tablet,
  screen_desktop,
  screen_mobile
} from './variables-export.scss';

export const tablet = `@media (min-width: ${screen_tablet})`;
export const desktop = `@media (min-width: ${screen_desktop})`;
export const mobile = `@media (max-width: ${screen_mobile})`;
