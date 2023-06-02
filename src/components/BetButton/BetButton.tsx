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
      {children}
    </BetBtn>
  );
}

const BetBtn = styled.button<{ clicked: Indeterminate }>`
  height: 30px;
  min-width: 30px;

  color: ${(p) => (p.clicked === "unclicked" ? "black" : "white")};
  background-color: ${({ clicked }) => {
    switch (clicked) {
      case "unclicked":
        return "unset";

      case "indeterminate":
        return "#5e5ea4";

      case "clicked":
        return "#0000ff";
    }
  }};

  :hover {
    cursor: pointer;
  }
`;
