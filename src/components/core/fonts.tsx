import styled from "styled-components";
import { AppTheme } from "./theme";

export type AppThemeColor = keyof AppTheme["font"]["color"];

export interface TypographyProps {
  color?: AppThemeColor;
}

export interface MappedProps extends TypographyProps {
  fontColor?: string;
}

export interface TitleProps {
  children: React.ReactNode;
  autoFocus?: boolean;
  id?: string;
}

const StyledHeadline = styled.h1<MappedProps>((p) => {
  const headline = p.theme.tokens.font.headline;
  return {
    fontFamily: headline.family,
    fontSize: headline.size,
    fontWeight: headline.weight,
    lineHeight: headline.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
    overflowWrap: "break-word",
    outline: "none",
  };
});

export function Headline({ children, ...props }: TitleProps) {
  return <StyledHeadline {...props}>{children}</StyledHeadline>;
}

/** @description h1 tag. Default 24px, 28px when large */
const StyledTitle1 = styled.h1<MappedProps & { large?: boolean }>((p) => {
  const title = p.large
    ? p.theme.tokens.font.title1
    : p.theme.tokens.font.title2;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
    overflowWrap: "break-word",
    outline: "none",
  };
});

export function Title1({
  children,
  ...props
}: TitleProps & { large?: boolean }) {
  return <StyledTitle1 {...props}>{children}</StyledTitle1>;
}

/** @description Title1 as h2 tag */
export const StyledTitle2 = styled.h2<MappedProps>((p) => {
  const title = p.theme.tokens.font.title2;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
    overflowWrap: "break-word",
    outline: "none",
  };
});

export function Title2({ children, ...props }: TitleProps) {
  return <StyledTitle2 {...props}>{children}</StyledTitle2>;
}

export const Subtitle = styled.h2<MappedProps>((p) => {
  const title = p.theme.tokens.font.subtitle;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
    overflowWrap: "break-word",
    hyphens: "auto",
  };
});

export const Body = styled.span<MappedProps>((p) => {
  const title = p.theme.tokens.font.body;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
  };
});

export const BodyMedium = styled(Body)`
  font-family: ${(props) => props.theme.tokens.font.bodyMedium.family};
`;

export const SmallBody = styled.span<MappedProps>((p) => {
  const title = p.theme.tokens.font.smallBody;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
  };
});

export const SmallBodyMedium = styled(SmallBody)`
  font-family: ${(props) => props.theme.tokens.font.smallBodyMedium.family};
`;

export const Caption = styled.span<MappedProps>((p) => {
  const title = p.theme.tokens.font.caption;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
  };
});
export const CaptionMedium = styled(Caption)`
  font-family: ${(props) => props.theme.tokens.font.captionMedium.family};
`;

export const Tiny = styled.span<MappedProps>((p) => {
  const title = p.theme.tokens.font.tiny;
  return {
    fontFamily: title.family,
    fontSize: title.size,
    fontWeight: title.weight,
    lineHeight: title.lineHeight,
    color: p.color ? p.theme.font.color[p.color] : "inherit",
  };
});
