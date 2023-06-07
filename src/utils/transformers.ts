import { OddsLabel } from "../components/Table/BetRow";

export const transformData = (type: OddsLabel, odds?: string) => {
  if (!odds) {
    return "-";
  }
  if (type === "Favoritskap") {
    return Math.floor(+odds) + "%";
  }

  if (type === "Svenska folket") {
    return odds + "%";
  }

  if (type === "Odds i procent") {
    return oddsToPercent(odds) + "%";
  }

  return odds;
};

export const oddsValue = (odds?: string, svenskaFolket?: string) => {
  if (!odds || !svenskaFolket) {
    return "-";
  }

  return (oddsToPercent(odds) / +svenskaFolket).toFixed(2);
};

const oddsToPercent = (odds: string) => {
  return Math.floor((1 / +odds.replace(",", ".")) * 100);
};
