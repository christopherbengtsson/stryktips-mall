import styled from "styled-components";
import { Bet, BetButton, BettingState } from "../BetButton";
import { InnerRow } from "./shared";
import { GameTitle } from "../GameTitle";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing.s};
  
  ${(p) => p.theme.screens.large} {
    gap: ${(p) => p.theme.spacing.xxl}
  }};
`;

export interface HeaderRowProps {
  eventNumber: number;
  eventDescription: string;
  bets: {
    bet: Bet;
    gameNumber: number;
    initialState?: BettingState;
    onClick: (args: {
      bet: Bet;
      gameNumber: number;
      state: BettingState;
    }) => void;
  }[];
}
export function HeaderRow(props: HeaderRowProps) {
  return (
    <Row>
      <GameTitle
        gameNumber={props.eventNumber}
        title={props.eventDescription}
      />

      <InnerRow>
        {props.bets.map(({ bet, gameNumber, onClick, initialState }) => (
          <BetButton
            key={`${gameNumber}-${bet}`}
            initialState={initialState}
            bet={bet}
            gameNumber={gameNumber}
            onClick={onClick}
          >
            {bet}
          </BetButton>
        ))}
      </InnerRow>
    </Row>
  );
}
