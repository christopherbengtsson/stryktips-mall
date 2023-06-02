import { ReactNode, useLayoutEffect, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { createTheme, ThemeVariants } from "./createTheme";
import "./styles/reset.css";
import "./styles/style.css";

export function ThemeProvider({
  children,
  variant = "light",
}: {
  variant?: ThemeVariants;
  children: ReactNode;
}) {
  const theme = useMemo(() => createTheme(variant), [variant]);

  useLayoutEffect(() => {
    const css = createCssVarsFromPalette(theme.tokens.palette);

    const style = document.createElement("style");
    document.head.prepend(style);
    style.appendChild(document.createTextNode(css));

    // Set properties on body object
    document.body.dataset.theme = variant;
    document.body.dataset.coreVersion = import.meta.env.CORE_VERSION;
    return () => {
      document.head.removeChild(style);
    };
  }, [variant, theme]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

function createCssVarsFromPalette(palette: Record<string, string>) {
  const cssVars = Object.entries(palette).reduce((acc, curr) => {
    acc += `--${curr[0]}: ${curr[1]};\n`;
    return acc;
  }, "");
  const css = `:root {${cssVars}}`;
  return css;
}
