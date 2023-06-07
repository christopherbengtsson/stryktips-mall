import { ReactNode } from 'react';
import styled from 'styled-components';

export function Footer({ children }: { children: ReactNode }) {
  return <StyledFooterContainer>{children}</StyledFooterContainer>;
}

const StyledFooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;

  background: ${(p) => p.theme.tokens.palette.concreteBlack};
  color: white;
  box-shadow: 0 -9px 8px 0 rgba(0, 0, 0, 0.28);

  display: grid;
  align-items: center;
  padding: 0 ${(p) => p.theme.spacing.l};
`;
