import { ReactNode } from "react";
import styled from "styled-components";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <AppContainer>
      <div>{children}</div>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;
