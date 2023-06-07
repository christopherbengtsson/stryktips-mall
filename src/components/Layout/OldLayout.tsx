import { ReactNode } from 'react';
import styled from 'styled-components';

export function Layout({ children }: { children: ReactNode }) {
  return <AppContainer>{children}</AppContainer>;
}

const AppContainer = styled.div`
  position: relative;

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.m};

  background: white;
  max-width: 1023px;
  padding: 16px 24px;

  ${(p) => p.theme.screens.large} {
    margin: ${(p) => p.theme.spacing.xxl} 0;
  }
`;
