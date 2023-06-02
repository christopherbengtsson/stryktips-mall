import { FavouriteOdds, Odds, SvenskaFolket } from "../../api";
import { Tag } from "../Tag";
import { Body } from "../core/fonts";
import { InnerRow, ThinRow } from "./shared";

type OddsType = "Odds" | "Svenska folket" | "Favoritskap";

const transformData = (type: OddsType, odds?: string | number) => {
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

export function TableRow(
  props:
    | {
        type: OddsType;
        odds?: Odds | SvenskaFolket | FavouriteOdds;
      }
    | {
        type: "Spelvärde";
        odds?: { svenskaFolket?: SvenskaFolket; favoriteOdds?: FavouriteOdds };
      }
) {
  return (
    <ThinRow>
      <Body>{props.type}</Body>
      <InnerRow>
        {props.type === "Spelvärde" ? (
          <Tag
            value={oddsValue(
              props.odds?.favoriteOdds?.one,
              props.odds?.svenskaFolket?.one
            )}
          />
        ) : (
          <Body>{transformData(props.type, props.odds?.one)}</Body>
        )}

        {props.type === "Spelvärde" ? (
          <Tag
            value={oddsValue(
              props.odds?.favoriteOdds?.x,
              props.odds?.svenskaFolket?.x
            )}
          />
        ) : (
          <Body>{transformData(props.type, props.odds?.x)}</Body>
        )}

        {props.type === "Spelvärde" ? (
          <Tag
            value={oddsValue(
              props.odds?.favoriteOdds?.two,
              props.odds?.svenskaFolket?.two
            )}
          />
        ) : (
          <Body>{transformData(props.type, props.odds?.two)}</Body>
        )}
      </InnerRow>
    </ThinRow>
  );
}
