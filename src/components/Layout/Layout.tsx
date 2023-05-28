import { ReactNode } from "react";
import styled from "styled-components";

export function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
