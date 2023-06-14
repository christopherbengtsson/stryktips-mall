import { ReactNode } from 'react';
import styled from 'styled-components';

import { LayoutIdMap } from './Constants';
import { HeaderShadow } from './LayoutShadow';
import { HEADER_HEIGHT } from '../core/Constants';

interface HeaderProps {
  leftNavigationItem?: ReactNode;
  centerNavigationItem?: ReactNode;
  rightNavigationItem?: ReactNode;
}

export function NavigationHeader({
  leftNavigationItem,
  rightNavigationItem,
  centerNavigationItem,
}: HeaderProps) {
  return (
    <NavigationHeaderContainer id={LayoutIdMap.headerContainer}>
      <StyledNavItem className="left">{leftNavigationItem}</StyledNavItem>
      <StyledNavItem className="center">
        <LogoContainer>{centerNavigationItem}</LogoContainer>
      </StyledNavItem>
      <StyledNavItem className="right">{rightNavigationItem}</StyledNavItem>
    </NavigationHeaderContainer>
  );
}

const NavigationHeaderContainer = styled.header`
  background-color: ${(p) => p.theme.background.default};
  border-top-left-radius: ${(p) => p.theme.radius.s};
  border-top-right-radius: ${(p) => p.theme.radius.s};
  position: relative;
  min-height: ${HEADER_HEIGHT}px;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);

  ${HeaderShadow}
`;

const StyledNavItem = styled.div`
  display: flex;
  align-items: center;

  &.left {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  font-family: ${(p) => p.theme.tokens.font.bodyMedium.family};
  text-align: center;

  svg,
  img {
    height: 24px;
  }
`;
