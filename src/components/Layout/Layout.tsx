import { ReactNode } from "react";
import styled from "styled-components";

export function Layout({ children }: { children: ReactNode }) {
  return <AppContainer>{children}</AppContainer>;
}

const AppContainer = styled.div`
  background: white;
  padding: 16px 24px;
`;
