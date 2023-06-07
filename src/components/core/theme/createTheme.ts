import { MOBILE_SCREEN_WIDTH, zIndexes } from '../Constants';
import { DesignTokens, ITokens } from './DesignTokens';
import { LightTheme } from './themes/light';

export type ThemeVariants = 'light';

type ITheme = typeof LightTheme;

export interface AppTheme extends ITheme {
  tokens: ITokens;
  spacing: ITokens['spacing'];
  radius: ITokens['radius'];
  screens: typeof screens;
  zIndexes: typeof zIndexes;
  variant: ThemeVariants;
}

const Themes = {
  light: LightTheme,
};

export function createTheme(themeType: ThemeVariants): AppTheme {
  const baseTheme = Themes[themeType];

  return {
    ...baseTheme,
    tokens: DesignTokens,
    spacing: DesignTokens.spacing,
    radius: DesignTokens.radius,
    screens,
    zIndexes,
    variant: themeType,
  };
}

const screens = {
  small: `@media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}px)`,
  large: `@media only screen and (min-width: ${MOBILE_SCREEN_WIDTH}.001px)`,
};
