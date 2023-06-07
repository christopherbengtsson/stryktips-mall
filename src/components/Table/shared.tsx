import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ThinRow = styled(Row)<{ fullHeight?: boolean }>`
  align-items: center;
  height: ${({ fullHeight }) => (fullHeight ? '100%' : '30px')};
`;

export const InnerRow = styled(Row)`
  align-items: center;
  gap: 8px;
`;
