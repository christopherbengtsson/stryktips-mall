import styled from "styled-components";
import { FORM_MAX_WIDTH_DESKTOP } from "../core/Constants";

export const FormWrapper = styled.main`
  width: 100%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 auto;
`;
export const FormContentContainer = styled.div<{ bottomPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  max-width: ${FORM_MAX_WIDTH_DESKTOP}px;
  margin: 0 auto;

  ${(p) => p.theme.screens.small} {
    padding-left: ${(p) => p.theme.spacing.m};
    padding-right: ${(p) => p.theme.spacing.m};
  }
  padding-bottom: ${(p) => (p.bottomPadding ? p.theme.spacing.xs : "0")};
`;
