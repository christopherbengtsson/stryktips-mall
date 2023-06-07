import styled from "styled-components";
import { DrawEvent } from "../../api";
import { BetButton } from "../BetButton";
import { Bets, BettingOption, BettingState } from "../../stores/StorageService";

export function BetButtons({
  event,
  initialBets,
  onClick,
}: {
  event: DrawEvent;
  initialBets?: Bets;
  onClick: (args: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => void;
}) {
  return (
    <BetButtonsContainer>
      <BetButton
        bet={1}
        gameNumber={event.eventNumber}
        onClick={onClick}
        initialState={
          initialBets ? initialBets[event.eventNumber - 1]?.[1] : undefined
        }
      >
        1
      </BetButton>

      <BetButton
        bet={"X"}
        gameNumber={event.eventNumber}
        onClick={onClick}
        initialState={
          initialBets ? initialBets[event.eventNumber - 1]?.X : undefined
        }
      >
        X
      </BetButton>

      <BetButton
        bet={2}
        gameNumber={event.eventNumber}
        onClick={onClick}
        initialState={
          initialBets ? initialBets[event.eventNumber - 1]?.[2] : undefined
        }
      >
        2
      </BetButton>
    </BetButtonsContainer>
  );
}

const BetButtonsContainer = styled.div`
  grid-area: betbuttons;
  justify-self: end;
  display: flex;
  gap: ${(p) => p.theme.spacing.tiny};
  width: 100%;
  justify-content: space-between;
`;
