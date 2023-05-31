import { DrawEvent } from "../../api";
import styled from "styled-components";
import { BaseStrategy } from "../BaseStrategy";

export function Table({ events }: { events: DrawEvent[] }) {
  return (
    <ul>
      {events.map((event: DrawEvent) => {
        console.log(event);

        const oddsValue = (favoriteOdds?: string, svenskaFolket?: string) => {
          if (!favoriteOdds || !svenskaFolket) {
            return "-";
          }

          return (+favoriteOdds / +svenskaFolket).toFixed(2);
        };
        return (
          <li key={event.eventDescription}>
            <Row>
              <h3>{event.eventDescription}</h3>

              <InnerRow>
                <h3>1</h3>
                <h3>X</h3>
                <h3>2</h3>
              </InnerRow>
            </Row>

            <Row>
              <p>Odds</p>
              <InnerRow>
                <p>{event.odds?.one ?? "-"}</p>
                <p>{event.odds?.x ?? "-"}</p>
                <p>{event.odds?.two ?? "-"}</p>
              </InnerRow>
            </Row>

            <Row>
              <p>Odds i procent</p>
              <InnerRow>
                <p>{event.favouriteOdds?.one ?? "-"}%</p>
                <p>{event.favouriteOdds?.x ?? "-"}%</p>
                <p>{event.favouriteOdds?.two ?? "-"}%</p>
              </InnerRow>
            </Row>

            <Row>
              <p>Svenska folket</p>
              <InnerRow>
                <p>{event.svenskaFolket.one}%</p>
                <p>{event.svenskaFolket.x}%</p>
                <p>{event.svenskaFolket.two}%</p>
              </InnerRow>
            </Row>

            <Row>
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
            </Row>

            <Row>
              <p>Utgångspunkt</p>
              <InnerRow>
                <ul>
                  <BaseStrategy peoplesOdds={event.svenskaFolket} />
                </ul>
              </InnerRow>
            </Row>
          </li>
        );
      })}
    </ul>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InnerRow = styled(Row)`
  gap: 8px;
`;
