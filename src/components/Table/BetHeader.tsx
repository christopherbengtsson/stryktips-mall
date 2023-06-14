import styled from 'styled-components';
import { Subtitle } from '../core/fonts';
import { DrawEvent } from '../../api';
import { EventResult } from '../../api/CouponResultResponse';

export function BetHeader({ event }: { event: EventResult | DrawEvent }) {
  const participants =
    (event as EventResult).participants ?? (event as DrawEvent).match.participants;

  return (
    <BetHeaderContainer>
      <BetHeaderInner>
        <GameNumber>{event.eventNumber}</GameNumber>
        <Participant>{participants.at(0)?.name}</Participant>
        <span>-</span>
        <Participant>{participants.at(1)?.name}</Participant>
      </BetHeaderInner>
    </BetHeaderContainer>
  );
}

const BetHeaderContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 0;
  flex-direction: column;
`;

const BetHeaderInner = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${(p) => p.theme.spacing.tiny};
  column-gap: 4px;
`;
const Participant = styled(Subtitle)`
  white-space: nowrap;
  text-overflow: ellipsis;

  ${(p) => p.theme.screens.small} {
    overflow: hidden;
  }
`;
const GameNumber = styled(Subtitle)`
  ${(p) => p.theme.screens.large} {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;

    color: ${(p) => p.theme.tokens.palette.white};
    background: ${(p) => p.theme.tokens.palette.deepOcean};
  }
`;
