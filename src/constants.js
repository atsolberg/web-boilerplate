/** Store all common constants. */


// Used in console logging
export const css = {
  fwb: 'font-weight: bold;',
  fwn: 'font-weight: normal;',
  black: 'color: #333333;',
  gray: 'color: #9E9E9E;',
  blue: 'color: #03A9F4;',
  green: 'color: #4CAF50;',
  red: 'color: #F20404;',
};

// Used in console logging
export const styles = {
  normal: `${css.fwn}${css.black}`,
  strong: `${css.fwb}${css.black}`,
  label: `${css.fwb}${css.gray}`,
  value: `${css.fwn}${css.blue}`,
  success: `${css.fwn}${css.green}`,
  error: `${css.fwn}${css.red}`,
};

export const assets = 'https://www.mysite.com/assets';

export const months = [
  { name: 'January', abbr: 'Jan', value: 1 },
  { name: 'February', abbr: 'Feb', value: 2 },
  { name: 'March', abbr: 'Mar', value: 3 },
  { name: 'April', abbr: 'Apr', value: 4 },
  { name: 'May', abbr: 'May', value: 5 },
  { name: 'June', abbr: 'Jun', value: 6 },
  { name: 'July', abbr: 'Jul', value: 7 },
  { name: 'August', abbr: 'Aug', value: 8 },
  { name: 'September', abbr: 'Sept', value: 9 },
  { name: 'October', abbr: 'Oct', value: 10 },
  { name: 'November', abbr: 'Nov', value: 11 },
  { name: 'December', abbr: 'Dec', value: 12 },
];

export const specials = {
  asterisk: {
    label: 'Asterisk',
    value: '*',
    entity: '*',
    unicode: '\u20F0',
  },
  reg: {
    label: 'Registered Trade Mark',
    value: '®',
    entity: '&reg;',
    unicode: '\u00AE',
  },
  tm: {
    label: 'Trade Mark',
    value: '™',
    entity: '&trade;',
    unicode: '\u2122',
  },
  sm: {
    label: 'Service Mark',
    value: '℠',
    entity: '&#8480;',
    unicode: '\u2120',
  },
  dagger: {
    label: 'Dagger',
    value: '†',
    entity: '&dagger;',
    unicode: '\u2020',
  },
  doubledagger: {
    label: 'Double Dagger',
    value: '‡',
    entity: '&Dagger;',
    unicode: '\u2021',
  },
  section: {
    label: 'Section',
    value: '§',
    entity: '&sect;',
    unicode: '\u00A7',
  },
};

export const keyCodes = {
  esc: 27,
  space: 32,
  enter: 13,
  tab: 9,
  up: 38,
  down: 40,
  home: 36,
  end: 35,
  n: 78,
  p: 80,
};

export const spacing = {
  space: '\u0020',
  nbsp: '\u00a0',
  ndash: '\u0096',
  mdash: '\u0097',
  ellipsis: '\u2026',
};

export const timing = { scroll: 500, expand: 150 };


export const mime = {
  app: {
    json: 'application/json',
    form: 'multipart/form-data',
  },
};

export const headers = {
  accept: 'Accept',
  content: 'Content-Type',
};
