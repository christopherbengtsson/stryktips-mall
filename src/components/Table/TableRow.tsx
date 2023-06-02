import { FavouriteOdds, Odds, SvenskaFolket } from "../../api";
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
      <p>{props.type}</p>
      <InnerRow>
        <p>
          {props.type === "Spelvärde"
            ? oddsValue(
                props.odds?.favoriteOdds?.one,
                props.odds?.svenskaFolket?.one
              )
            : transformData(props.type, props.odds?.one)}
        </p>
        <p>
          {props.type === "Spelvärde"
            ? oddsValue(
                props.odds?.favoriteOdds?.x,
                props.odds?.svenskaFolket?.x
              )
            : transformData(props.type, props.odds?.x)}
        </p>
        <p>
          {props.type === "Spelvärde"
            ? oddsValue(
                props.odds?.favoriteOdds?.two,
                props.odds?.svenskaFolket?.two
              )
            : transformData(props.type, props.odds?.two)}
        </p>
      </InnerRow>
    </ThinRow>
  );
}
