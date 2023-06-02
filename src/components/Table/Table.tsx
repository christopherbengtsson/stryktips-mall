import { DrawEvent } from "../../api";
import styled from "styled-components";
import { BaseStrategy } from "../BaseStrategy";
import { Bet, Indeterminate } from "../BetButton";
import { Bets } from "../../stores/StorageService";
import { InnerRow, ThinRow } from "./shared";
import { HeaderRow } from "./HeaderRow";
import { TableRow } from "./TableRow";

export function Table({
  events,
  initialsBets,
  onBetClick,
}: {
  events: DrawEvent[];
  initialsBets?: Bets;
  onBetClick: (args: {
    bet: Bet;
    gameNumber: number;
    state: Indeterminate;
  }) => void;
}) {
  const handleClick = (args: {
    bet: Bet;
    gameNumber: number;
    state: Indeterminate;
  }) => {
    onBetClick(args);
  };

  return (
    <StyledList>
      {events.map((event: DrawEvent, idx) => {
        const fullGameTitle = `${event.match.participants.at(0)?.name} - ${
          event.match.participants.at(1)?.name
        }`;

        // TODO: USE SHORT TITLE ON SMALLER SCREENSS
        // const shortGameTitle = `${
        //   event.match.participants.at(0)?.mediumName
        // } - ${event.match.participants.at(1)?.mediumName}`;

        return (
          <StyledListItem key={event.eventDescription}>
            <HeaderRow
              bets={[
                {
                  bet: 1,
                  gameNumber: idx + 1,
                  onClick: handleClick,
                  initialState: initialsBets
                    ? initialsBets[idx + 1][1]
                    : undefined,
                },
                {
                  bet: "X",
                  gameNumber: idx + 1,
                  onClick: handleClick,
                  initialState: initialsBets
                    ? initialsBets[idx + 1].X
                    : undefined,
                },
                {
                  bet: 2,
                  gameNumber: idx + 1,
                  onClick: handleClick,
                  initialState: initialsBets
                    ? initialsBets[idx + 1][2]
                    : undefined,
                },
              ]}
              eventNumber={event.eventNumber}
              eventDescription={fullGameTitle}
            />

            <TableRow type="Odds" odds={event.odds} />
            <TableRow type="Favoritskap" odds={event.favouriteOdds} />
            <TableRow type="Svenska folket" odds={event.svenskaFolket} />
            <TableRow
              type="Spelvärde"
              odds={{
                favoriteOdds: event.favouriteOdds,
                svenskaFolket: event.svenskaFolket,
              }}
            />

            <ThinRow fullHeight>
              <p>Utgångspunkt</p>
              <InnerRow>
                <ul>
                  <BaseStrategy peoplesOdds={event.svenskaFolket} />
                </ul>
              </InnerRow>
            </ThinRow>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ol`
  padding: 0;

  li:nth-child(odd) {
  }
  li:nth-child(even) {
    background: rgba(0, 66, 122, 0.03);
  }
`;

const StyledListItem = styled.li`
  list-style: none;
  padding: 16px 8px;
  border-top: #e1e1e5 1px solid;
`;
