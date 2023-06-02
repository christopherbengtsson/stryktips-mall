import { Bets, BettingOption } from "../stores/StorageService";

export function buildSvenskaSpelURL(
  drawNumber: number,
  data: Bets,
  valid: boolean
) {
  const baseUrl = "https://spela.svenskaspel.se/stryktipset";

  let clickedKeys = "";

  for (const key in data) {
    const matchBets = data[key];
    const matchSigns = (Object.keys(matchBets) as BettingOption[])
      .filter((sign) => matchBets[sign] === "clicked")
      .join(";");

    if (matchSigns) {
      clickedKeys += `${key}:${matchSigns},`;
    }
  }

  // Remove the trailing comma and space if they exist
  if (clickedKeys.endsWith(",")) {
    clickedKeys = clickedKeys.slice(0, -1);
  }

  const share = valid ? "valid" : "invalid";
  const url = `${baseUrl}?product=1&draw=${drawNumber}&signs=${encodeURIComponent(
    clickedKeys
  )}&share=${share}`;
  return url;
}
