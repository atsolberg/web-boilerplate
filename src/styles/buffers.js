import { css } from '@emotion/core';

export const bumps = {
  up: {
    sm: css`
      margin-bottom: 12px;
    `,
    md: css`
      margin-bottom: 16px;
    `,
    lg: css`
      margin-bottom: 24px;
    `,
    xl: css`
      margin-bottom: 48px;
    `
  },
  down: {
    sm: css`
      margin-top: 12px;
    `,
    md: css`
      margin-top: 16px;
    `,
    lg: css`
      margin-top: 24px;
    `,
    xl: css`
      margin-top: 48px;
    `
  }
};

export const pad = {
  up: {
    sm: css`
      padding-bottom: 12px;
    `,
    md: css`
      padding-bottom: 16px;
    `,
    lg: css`
      padding-bottom: 24px;
    `,
    xl: css`
      padding-bottom: 48px;
    `
  },
  down: {
    sm: css`
      padding-top: 12px;
    `,
    md: css`
      padding-top: 16px;
    `,
    lg: css`
      padding-top: 24px;
    `,
    xl: css`
      padding-top: 48px;
    `
  },
  all: {
    sm: css`
      padding: 12px;
    `,
    md: css`
      padding: 16px;
    `,
    lg: css`
      padding: 24px;
    `,
    xl: css`
      padding: 48px;
    `
  }
};
