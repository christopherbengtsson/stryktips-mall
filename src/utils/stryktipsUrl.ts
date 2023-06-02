import { Bets, BettingOption } from "../stores/StorageService";

export function buildSvenskaSpelURL(
  drawNumber: number,
  data: Bets,
  valid: boolean
) {
  const baseUrl = "https://spela.svenskaspel.se/stryktipset";

  const order: BettingOption[] = [1, "X", 2];

  const clickedKeys = data
    .map((match, index) => {
      const matchSigns = order
        .filter((sign) => match[sign] === "clicked")
        .join(";");

      return matchSigns ? `${index + 1}:${matchSigns}` : "";
    })
    .filter(Boolean)
    .join(",");

  const share = valid ? "valid" : "invalid";
  const url = `${baseUrl}?product=1&draw=${drawNumber}&signs=${encodeURIComponent(
    clickedKeys
  )}&share=${share}`;
  return url;
}
