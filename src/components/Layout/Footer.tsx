import styled from 'styled-components';
import { LayoutIdMap } from './Constants';

import { ReactNode } from 'react';
import { FooterShadow } from './LayoutShadow';

const FooterContainer = styled.footer`
  flex-shrink: 0;

  position: relative;
  width: 100%;

  background: ${(p) => p.theme.background.default};
  transition: opacity 0.2s;

  display: flex;
  flex-direction: column;

  ${FooterShadow}
`;

export interface FooterProps {
  children?: ReactNode;
}
export function Footer({ children }: FooterProps) {
  return <FooterContainer id={LayoutIdMap.footerContainer}>{children}</FooterContainer>;
}
