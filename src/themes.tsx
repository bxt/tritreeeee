import styles from './themes.module.css';

const THEME_COLOR_COUNT = 8;

export const getColor = (number: number) =>
  `var(--color${number % THEME_COLOR_COUNT})`;

const { grayscale, blackpink, pastels } = styles;

export const themes = { grayscale, blackpink, pastels } as const;

export type ThemeName = keyof typeof themes;
