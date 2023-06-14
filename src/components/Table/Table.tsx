import { CouponType, DrawEvent } from '../../api';
import styled from 'styled-components';
import { Bets, BettingOption, BettingState } from '../../stores/StorageService';
import { BetHeader } from './BetHeader';
import { BetButtons } from './BetButtons';
import { BetRow } from './BetRow';
import { OutlinedButton } from '../OutlinedButton';
import { GameAnalyse } from '../../api/AnalysResponse';
import { Caption } from '../core/fonts';
import { stripHtml } from 'string-strip-html';
import { EventResult } from '../../api/CouponResultResponse';

export function Table({
  events,
  initialsBets,
  onBetClick,
  couponType,
  showAnalysis,
  gameAnalysis,
}: {
  events: EventResult[] | DrawEvent[];
  initialsBets?: Bets;
  onBetClick: (args: { bet: BettingOption; gameNumber: number; state: BettingState }) => void;
  couponType: CouponType;
  showAnalysis: boolean;
  gameAnalysis?: GameAnalyse[];
}) {
  const handleBetClick = (args: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => {
    onBetClick(args);
  };

  const handleEventClick = (eventNumber: number) => {
    window.open(
      `https://spela.svenskaspel.se/${couponType}/statistik?event=${eventNumber}&openStatistic=`,
      '_blank',
    );
  };

  return (
    <StyledList>
      {events.map((event: EventResult | DrawEvent, idx) => {
        const analysis = gameAnalysis?.at(idx)?.body;
        const isResult = !!(event as EventResult)?.outcome?.length;

        return (
          <StyledListItem key={event.eventDescription}>
            <BetHeader event={event} />
            <BetButtons event={event} initialBets={initialsBets} onClick={handleBetClick} />

            {!isResult && (
              <>
                <BetsContainer>
                  <BetRow title="Odds" odds={(event as DrawEvent).odds} />
                  <BetRow title="Odds i procent" odds={(event as DrawEvent).odds} />
                  <BetRow title="Favoritskap" odds={(event as DrawEvent).favouriteOdds} />
                  <BetRow title="Svenska folket" odds={(event as DrawEvent).svenskaFolket} />
                  <BetRow title="Spelvärde" odds={event as DrawEvent} />
                  <BetRow title="Utgångspunkt" odds={event as DrawEvent} />
                </BetsContainer>
                <BetsContainer>
                  <GridContainer>
                    {showAnalysis && analysis ? (
                      <Caption>{stripHtml(analysis).result}</Caption>
                    ) : showAnalysis ? (
                      <Caption>För tillfället finns inget spelanalys</Caption>
                    ) : null}

                    <OutlinedButton onClick={() => handleEventClick(event.eventNumber)}>
                      Statistik
                    </OutlinedButton>
                  </GridContainer>
                </BetsContainer>{' '}
              </>
            )}
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ol`
  margin-top: ${(p) => p.theme.spacing.xl}
  padding: 0;
  border-left: 6px solid white;



`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 48px auto fit-content(100%) minmax(150px, 30%);
  grid-template-areas:
    'badge description mSign betbuttons'
    'tipsinfo tipsinfo tipsinfo tipsinfo'
    'matchanalyses matchanalyses matchanalyses matchanalyses'
    'eventcomment eventcomment eventcomment eventcomment';

  align-items: center;
  padding: ${(p) => p.theme.spacing.s};
  border-top: 1px solid ${(p) => p.theme.border.color.default};

  ${(p) => p.theme.screens.small} {
    grid-template-columns: minmax(100px, 1fr) fit-content(100%) minmax(102px, 30%);
    grid-template-areas:
      'description mSign betbuttons'
      'tipsinfo tipsinfo tipsinfo'
      'eventcomment eventcomment eventcomment'
      'matchanalyses matchanalyses matchanalyses';

    padding: ${(p) => p.theme.spacing.tiny} ${(p) => p.theme.spacing.s}
      ${(p) => p.theme.spacing.tiny} ${(p) => p.theme.spacing.xs};
  }
`;

const BetsContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 5;
  margin-top: 18px;

  ${(p) => p.theme.screens.small} {
    grid-column-end: 4;
    margin-top: ${(p) => p.theme.spacing.xs};
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: ${(p) => p.theme.spacing.xs};
`;
