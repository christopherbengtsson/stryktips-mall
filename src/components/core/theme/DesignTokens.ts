export const palette = {
  /** Used on all text */
  black: "#1A1523",
  /** Background color primary CTA */
  almostBlack: "#2E2E32",
  /** Most backgrounds */
  white: "#FFFFFF",
  /** Text color on main CTA */
  almostWhite: "#FDFCFD",
  /** Background color primary CTA on Hover */
  concreteBlack: "#3E3E44",
  /** Text color used on disabled main CTA:s */
  concreteDark: "#86848D",
  /** Text color used on disabled components. aka Concrete */
  concrete: "#908E96",
  //** On toggle (switch) background */
  concreteMedium: "#C8C7CB",
  /** Used on borders and dividers, used on disabled main CTA */
  concreteLight: "#DCDBDD",
  /** Used on subtle border for sticky headers and footers */
  concreteSuperLight: "#E4E2E4",
  /** Subtle component backgrounds  */
  fog: "#F4F2F4",
  /** used on text field border when invalid */
  bloodOut: "#D90004",
  /** used on error body text */
  bloodIn: "#C30007",
  /** Main action color */
  deepOcean: "#00427a",
} as const;

export const spacing = {
  tiny: "4px",
  xs: "8px",
  s: "16px",
  m: "24px",
  l: "32px",
  xl: "40px",
  xxl: "48px",
  xxxl: "56px",
} as const;

export const DesignTokens = {
  palette: palette,
  spacing: spacing,
  radius: {
    tiny: "4px",
    s: "8px",
    m: "16px",
  },
  border: {
    default: {
      size: "1px",
      color: palette.concreteLight,
      boxShadow: `0 0 0 1px ${palette.concreteLight}`,
    },
    error: {
      boxShadow: `0 0 0 2px ${palette.bloodOut}`,
    },
    active: {
      boxShadow: `0 0 0 2px ${palette.almostBlack}`,
    },
    hover: {
      boxShadow: `0 0 0 1px ${palette.concrete}`,
    },
    disabled: {
      boxShadow: `0 0 0 1px ${palette.concrete}`,
    },
  },
  font: {
    headline: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "700",
      size: "2rem", //32px
      lineHeight: "2.5rem", //40px
    },
    title1: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "700",
      size: "1.75rem", //28px
      lineHeight: "2rem", //32px
    },
    title2: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "700",
      size: "1.5rem", // 24px
      lineHeight: "2rem", // 32px
    },
    subtitle: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "400",
      size: "1.25rem",
      lineHeight: "1.5rem", // 24px
    },
    body: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "400",
      size: "1rem",
      lineHeight: "1.5rem", // 24px
    },
    bodyMedium: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "500",
      size: "1rem",
      lineHeight: "1.5rem", // 24px
    },
    smallBody: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "400",
      size: "0.875rem", // 14px
      lineHeight: "1rem",
      lineHeightLarge: "1.125rem", //18px
    },
    smallBodyMedium: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "500",
      size: "0.875rem", // 14px
      lineHeight: "1rem",
    },
    caption: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "400",
      size: "0.75rem", // 12px
      lineHeight: "1rem",
    },
    captionMedium: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "500",
      size: "0.75rem", // 12px
      lineHeight: "1rem",
    },
    tiny: {
      family: "Helvetica Neue, Arial, sans-serif",
      weight: "400",
      size: "0.625rem", // 10px
      lineHeight: "0.75rem", // 12px
    },
  },
} as const;

export type ITokens = typeof DesignTokens;
export type IPalette = typeof palette;
export type IPaletteKey = keyof IPalette;
export type IFontVersions = ITokens["font"];
export type IFontKeys = keyof IFontVersions;
