import styled from 'styled-components';
import { DrawEvent } from '../../api';
import { BetButton } from '../BetButton';
import { Bets, BettingOption, BettingState } from '../../stores/StorageService';
import { EventResult } from '../../api/CouponResultResponse';

export function BetButtons({
  event,
  initialBets,
  onClick,
}: {
  event: EventResult | DrawEvent;
  initialBets?: Bets;
  onClick: (args: { bet: BettingOption; gameNumber: number; state: BettingState }) => void;
}) {
  const outcome = (event as EventResult).outcome;
  return (
    <BetButtonsContainer>
      <BetButton
        bet={1}
        gameNumber={event.eventNumber}
        onClick={onClick}
        disabled={!!outcome}
        correctResult={outcome === '1'}
        initialState={initialBets ? initialBets[event.eventNumber - 1]?.[1] : undefined}
      >
        1
      </BetButton>

      <BetButton
        bet={'X'}
        gameNumber={event.eventNumber}
        onClick={onClick}
        disabled={!!outcome}
        correctResult={outcome == 'X'}
        initialState={initialBets ? initialBets[event.eventNumber - 1]?.X : undefined}
      >
        X
      </BetButton>

      <BetButton
        bet={2}
        gameNumber={event.eventNumber}
        onClick={onClick}
        disabled={!!outcome}
        correctResult={outcome === '2'}
        initialState={initialBets ? initialBets[event.eventNumber - 1]?.[2] : undefined}
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
