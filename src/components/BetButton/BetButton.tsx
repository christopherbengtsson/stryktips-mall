import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";

export type Indeterminate = "clicked" | "unclicked" | "indeterminate";
export type Bet = 1 | "X" | 2;
export function BetButton({
  initialState,
  gameNumber,
  bet,
  onClick,
  children,
}: {
  initialState?: Indeterminate;
  gameNumber: number;
  bet: Bet;
  onClick: (args: {
    bet: Bet;
    gameNumber: number;
    state: Indeterminate;
  }) => void;
  children: ReactNode;
}) {
  const [clicked, setClicked] = useState<Indeterminate>(
    initialState ?? "unclicked"
  );

  const handleClick = () => {
    let state: Indeterminate = "indeterminate";

    switch (clicked) {
      case "unclicked":
        state = "clicked";
        break;

      case "clicked":
        state = "indeterminate";
        break;

      case "indeterminate":
        state = "unclicked";
        break;
    }

    setClicked(state);
    onClick({ bet, gameNumber, state });
  };

  return (
    <BetBtn clicked={clicked} onClick={handleClick}>
      <Indeterminate indeterminate={clicked === "indeterminate"}>
        {children}
      </Indeterminate>
    </BetBtn>
  );
}

const BetBtn = styled.button<{ clicked: Indeterminate }>`
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

const Indeterminate = styled.div<{ indeterminate: boolean }>`
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
