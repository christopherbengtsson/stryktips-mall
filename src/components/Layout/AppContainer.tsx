import { ReactNode } from "react";
import styled from "styled-components";

const RelativeContainer = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.theme.background.default};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export function AppContainer({ children }: { children: ReactNode }) {
  return <RelativeContainer>{children}</RelativeContainer>;
}
