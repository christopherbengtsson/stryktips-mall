import { ReactNode, useState } from "react";
import styled from "styled-components";

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
  border: 1px solid black;
  height: 30px;
  min-width: 45px;

  color: ${(p) => (p.clicked === "unclicked" ? "black" : "white")};
  background-color: ${({ clicked }) => {
    if (clicked === "clicked") {
      return "#0000ff";
    }

    return "unset";
  }};

  :hover {
    cursor: pointer;
  }
`;

const Indeterminate = styled.div<{ indeterminate: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;

  ${({ indeterminate }) => {
    if (indeterminate) {
      return "background: #0000ff";
    }
  }}
`;
