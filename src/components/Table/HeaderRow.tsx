import styled from "styled-components";
import { BetButton } from "../BetButton";
import { InnerRow } from "./shared";
import { GameTitle } from "../GameTitle";
import { BettingOption, BettingState } from "../../stores/StorageService";

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
    bet: BettingOption;
    gameNumber: number;
    initialState?: BettingState;
    onClick: (args: {
      bet: BettingOption;
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
