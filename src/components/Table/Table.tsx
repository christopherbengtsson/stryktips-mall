import { DrawEvent } from "../../api";
import styled from "styled-components";
import { Bets, BettingOption, BettingState } from "../../stores/StorageService";
import { BetHeader } from "./BetHeader";
import { BetButtons } from "./BetButtons";
import { BetRow } from "./BetRow";

export function Table({
  events,
  initialsBets,
  onBetClick,
}: {
  events: DrawEvent[];
  initialsBets?: Bets;
  onBetClick: (args: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => void;
}) {
  const handleClick = (args: {
    bet: BettingOption;
    gameNumber: number;
    state: BettingState;
  }) => {
    onBetClick(args);
  };

  return (
    <StyledList>
      {events.map((event: DrawEvent) => {
        return (
          <StyledListItem key={event.eventDescription}>
            <BetHeader event={event} />
            <BetButtons
              event={event}
              initialBets={initialsBets}
              onClick={handleClick}
            />

            <BetsContainer>
              <BetRow title="Odds" odds={event.odds} />
              <BetRow title="Favoritskap" odds={event.favouriteOdds} />
              <BetRow title="Svenska folket" odds={event.svenskaFolket} />
              <BetRow title="Spelvärde" odds={event} />
              <BetRow title="Utgångspunkt" odds={event} />
            </BetsContainer>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ol`
  margin-top: ${(p) => p.theme.spacing.xl}
  padding: 0;

  > li:nth-child(even) {
    background: ${(p) => p.theme.tokens.palette.fog};
  }


`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 48px auto fit-content(100%) minmax(150px, 30%);
  grid-template-areas:
    "badge description mSign betbuttons"
    "tipsinfo tipsinfo tipsinfo tipsinfo"
    "matchanalyses matchanalyses matchanalyses matchanalyses"
    "eventcomment eventcomment eventcomment eventcomment";

  align-items: center;
  padding: ${(p) => p.theme.spacing.s};

  ${(p) => p.theme.screens.small} {
    grid-template-columns: minmax(100px, 1fr) fit-content(100%) minmax(
        102px,
        30%
      );
    grid-template-areas:
      "description mSign betbuttons"
      "tipsinfo tipsinfo tipsinfo"
      "eventcomment eventcomment eventcomment"
      "matchanalyses matchanalyses matchanalyses";

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
    margin-top: 0;
  }
`;
