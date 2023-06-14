import { ReactNode } from 'react';
import styled from 'styled-components';

import { LayoutIdMap } from './Constants';
import { HeaderShadow } from './LayoutShadow';
import { HEADER_HEIGHT } from '../core/Constants';

interface HeaderProps {
  headerProps?: ReactNode;
}

export function NavigationHeader({ headerProps }: HeaderProps) {
  return (
    <NavigationHeaderContainer id={LayoutIdMap.headerContainer}>
      <StyledNavItem>{headerProps}</StyledNavItem>
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
`;
