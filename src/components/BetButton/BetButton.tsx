import { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { BettingOption, BettingState } from '../../stores/StorageService';

export function BetButton({
  initialState,
  gameNumber,
  bet,
  onClick,
  children,
  disabled,
  correctResult,
}: {
  initialState?: BettingState;
  gameNumber: number;
  bet: BettingOption;
  onClick: (args: { bet: BettingOption; gameNumber: number; state: BettingState }) => void;
  children: ReactNode;
  disabled?: boolean;
  correctResult?: boolean;
}) {
  const [clicked, setClicked] = useState<BettingState>(initialState ?? 'unclicked');

  const handleClick = () => {
    let state: BettingState;

    switch (clicked) {
      case 'unclicked':
        state = 'clicked';
        break;

      case 'clicked':
        state = 'indeterminate';
        break;

      case 'indeterminate':
        state = 'unclicked';
        break;
    }

    setClicked(state);
    onClick({ bet, gameNumber, state });
  };

  return (
    <BetBtn
      clicked={clicked}
      onClick={handleClick}
      disabled={disabled}
      correctResult={correctResult}
    >
      <IndeterminateState indeterminate={clicked === 'indeterminate'}>
        {children}
      </IndeterminateState>
    </BetBtn>
  );
}

const BetBtn = styled.button<{ clicked: BettingState; correctResult?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 30px;
  min-width: 30px;
  width: 100%;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;

  ${(props) => {
    const themed = props.theme.primaryButton;

    return css`
      border-radius: ${props.theme.radius.s};
      border: ${props.theme.tokens.border.default.size} solid
        ${props.theme.tokens.palette.almostBlack};
      background-color: ${props.clicked === 'clicked'
        ? props.theme.tokens.palette.deepOcean
        : props.theme.tokens.palette.white};
      color: ${themed.font.color.default};
      color: ${props.clicked === 'unclicked'
        ? props.theme.tokens.palette.almostBlack
        : themed.font.color.default};
      &:disabled {
        cursor: not-allowed;
      }
    `;
  }};

  ${(p) =>
    p.correctResult && {
      border: `${p.theme.spacing.tiny} solid green`,
    }}
`;

const IndeterminateState = styled.div<{ indeterminate: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 70%;
  height: 70%;
  ${({ indeterminate, theme }) => {
    if (indeterminate) {
      return `background: ${theme.tokens.palette.deepOcean}`;
    }
  }};

  border-radius: ${(p) => p.theme.radius.tiny};
`;
