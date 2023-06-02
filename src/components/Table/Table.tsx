import { DrawEvent } from "../../api";
import styled from "styled-components";
import { BaseStrategy } from "../BaseStrategy";
import { Bet, BetButton, Indeterminate } from "../BetButton";
import { Bets } from "../../stores/StorageService";

const oddsValue = (favoriteOdds?: string, svenskaFolket?: string) => {
  if (!favoriteOdds || !svenskaFolket) {
    return "-";
  }

  return (+favoriteOdds / +svenskaFolket).toFixed(2);
};

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
        return (
          <StyledListItem key={event.eventDescription}>
            <Row>
              <h3>
                {event.eventNumber}. {event.eventDescription}
              </h3>

              <InnerRow>
                <BetButton
                  initialState={
                    initialsBets ? initialsBets[idx + 1][1] : undefined
                  }
                  bet={1}
                  gameNumber={idx + 1}
                  onClick={handleClick}
                >
                  1
                </BetButton>
                <BetButton
                  initialState={
                    initialsBets ? initialsBets[idx + 1].X : undefined
                  }
                  bet={"X"}
                  gameNumber={idx + 1}
                  onClick={handleClick}
                >
                  X
                </BetButton>
                <BetButton
                  initialState={
                    initialsBets ? initialsBets[idx + 1][2] : undefined
                  }
                  bet={2}
                  gameNumber={idx + 1}
                  onClick={handleClick}
                >
                  2
                </BetButton>
              </InnerRow>
            </Row>

            <ThinRow>
              <p>Odds</p>
              <InnerRow>
                <p>{event.odds?.one ?? "-"}</p>
                <p>{event.odds?.x ?? "-"}</p>
                <p>{event.odds?.two ?? "-"}</p>
              </InnerRow>
            </ThinRow>

            <ThinRow>
              <p>Odds i procent</p>
              <InnerRow>
                <p>{Math.floor(+(event.favouriteOdds?.one ?? 0))}%</p>
                <p>{Math.floor(+(event.favouriteOdds?.x ?? 0))}%</p>
                <p>{Math.floor(+(event.favouriteOdds?.two ?? 0))}%</p>
              </InnerRow>
            </ThinRow>

            <ThinRow>
              <p>Svenska folket</p>
              <InnerRow>
                <p>{event.svenskaFolket.one}%</p>
                <p>{event.svenskaFolket.x}%</p>
                <p>{event.svenskaFolket.two}%</p>
              </InnerRow>
            </ThinRow>

            <ThinRow>
              <p>Spelvärde</p>
              <InnerRow>
                <p>
                  {oddsValue(event.favouriteOdds?.one, event.svenskaFolket.one)}
                </p>
                <p>
                  {oddsValue(event.favouriteOdds?.x, event.svenskaFolket.x)}
                </p>
                <p>
                  {oddsValue(event.favouriteOdds?.two, event.svenskaFolket.two)}
                </p>
              </InnerRow>
            </ThinRow>

            <ThinRow>
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThinRow = styled(Row)`
  align-items: center;
  height: 30px;
`;

const InnerRow = styled(Row)`
  align-items: center;
  gap: 8px;
`;
