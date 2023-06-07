import styled from 'styled-components';

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;

  overflow-y: auto;
  overflow-x: hidden;

  /* Add scrollbar styling on desktop to avoid content jumps */
  ${(p) => p.theme.screens.large} {
    --scrollbarWidth: 6px;

    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: ${(p) => p.theme.scrollBar.thumb.color} transparent;

    &::-webkit-scrollbar {
      width: var(--scrollbarWidth);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(p) => p.theme.scrollBar.thumb.color};
      border-radius: 0px;
      border: 3px solid transparent;
    }
  }
`;
