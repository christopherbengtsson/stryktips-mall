import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";
import { BettingOption, BettingState } from "../../stores/StorageService";

export function BetButton({
  initialState,
  gameNumber,
  bet,
  onClick,
  children,
}: {
  initialState?: BettingState;
  gameNumber: number;
  bet: BettingOption;
  onClick: (args: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => void;
  children: ReactNode;
}) {
  const [clicked, setClicked] = useState<BettingState>(
    initialState ?? "unclicked"
  );

  const handleClick = () => {
    let state: BettingState = "bettingState";

    switch (clicked) {
      case "unclicked":
        state = "clicked";
        break;

      case "clicked":
        state = "bettingState";
        break;

      case "bettingState":
        state = "unclicked";
        break;
    }

    setClicked(state);
    onClick({ bet, gameNumber, state });
  };

  return (
    <BetBtn clicked={clicked} onClick={handleClick}>
      <BettingState bettingState={clicked === "bettingState"}>
        {children}
      </BettingState>
    </BetBtn>
  );
}

const BetBtn = styled.button<{ clicked: BettingState }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  min-width: 45px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;

  ${(props) => {
    const themed = props.theme.primaryButton;

    return css`
      border-radius: ${props.theme.radius.s};
      border: ${props.theme.tokens.border.default.size} solid
        ${props.theme.tokens.palette.almostBlack};
      background-color: ${props.clicked === "clicked"
        ? props.theme.tokens.palette.deepOcean
        : props.theme.tokens.palette.white};
      color: ${themed.font.color.default};
      color: ${props.clicked === "unclicked"
        ? props.theme.tokens.palette.almostBlack
        : themed.font.color.default};
      &:disabled {
        background-color: ${themed.background.disabled};
        cursor: not-allowed;
      }
    `;
  }};
`;

const BettingState = styled.div<{ bettingState: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 70%;
  height: 70%;
  ${({ bettingState, theme }) => {
    if (bettingState) {
      return `background: ${theme.tokens.palette.deepOcean}`;
    }
  }};

  border-radius: ${(p) => p.theme.radius.tiny};
`;
