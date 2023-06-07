import styled from 'styled-components';

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
  margin: 0 auto;

  gap: ${(p) => p.theme.spacing.m};

  padding-bottom: ${(p) => (p.bottomPadding ? p.theme.spacing.xs : '0')};
`;
