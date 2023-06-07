import styled from "styled-components";
import { DrawEvent, FavouriteOdds, Odds, SvenskaFolket } from "../../api";
import { Body } from "../core/fonts";
import { Tag } from "../Tag";
import { BaseStrategy } from "../BaseStrategy";

export type OddsLabel = "Odds" | "Svenska folket" | "Favoritskap";
export type OddsType = Odds | SvenskaFolket | FavouriteOdds;

const transformData = (type: OddsLabel, odds?: string) => {
  if (type === "Favoritskap") {
    return Math.floor(+(odds ?? 0)) + "%";
  }

  if (type === "Svenska folket") {
    return odds + "%";
  }

  return odds ?? "-";
};

const oddsValue = (favoriteOdds?: string, svenskaFolket?: string) => {
  if (!favoriteOdds || !svenskaFolket) {
    return "-";
  }

  return (+favoriteOdds / +svenskaFolket).toFixed(2);
};

export function BetRow({
  title,
  odds,
}:
  | {
      title: OddsLabel;
      odds?: OddsType;
    }
  | {
      title: "Spelvärde" | "Utgångspunkt";
      odds: DrawEvent;
    }) {
  return (
    <BetRowContainer>
      <Body>{title}</Body>
      <BetValues justifyStart={title === "Utgångspunkt"}>
        {title === "Spelvärde" ? (
          <>
            <Tag
              value={oddsValue(odds.favouriteOdds?.one, odds.svenskaFolket.one)}
            />
            <Tag
              value={oddsValue(odds.favouriteOdds?.x, odds.svenskaFolket.x)}
            />
            <Tag
              value={oddsValue(odds.favouriteOdds?.two, odds.svenskaFolket.two)}
            />
          </>
        ) : title === "Utgångspunkt" ? (
          <ul>
            <BaseStrategy peoplesOdds={odds.svenskaFolket} />
          </ul>
        ) : (
          <>
            <Body>{transformData(title, (odds as OddsType)?.one)}</Body>
            <Body>{transformData(title, (odds as OddsType)?.x)}</Body>
            <Body>{transformData(title, (odds as OddsType)?.two)}</Body>
          </>
        )}
      </BetValues>
    </BetRowContainer>
  );
}

const BetRowContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(150px, 30%);
  grid-template-areas: "title stats";
  margin-top: ${(p) => p.theme.spacing.tiny};
  align-items: center;

  ${(p) => p.theme.screens.small} {
    grid-template-columns: auto minmax(102px, 30%);
    margin-top: ${(p) => p.theme.spacing.tiny};
    align-items: center;
  }
`;

const BetValues = styled.div<{ justifyStart?: boolean }>`
  grid-area: stats;
  display: flex;
  gap: ${(p) => p.theme.spacing.s};
  justify-self: end;
  width: 100%;
  justify-content: space-around;

  ${(p) => p.justifyStart && "justify-content: start;"}

  ${(p) => p.theme.screens.small} {
    gap: ${(p) => p.theme.spacing.xs};
  }
`;
