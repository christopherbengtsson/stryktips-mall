import { CouponType } from "../api";
import { Bets, BettingOption } from "../stores/StorageService";

export function buildSvenskaSpelURL({
  drawNumber,
  bets,
  valid,
  couponType,
}: {
  drawNumber: number;
  bets: Bets;
  valid: boolean;
  couponType: CouponType;
}) {
  const baseUrl = `https://spela.svenskaspel.se/${couponType}`;

  const order: BettingOption[] = [1, "X", 2];

  const clickedKeys = bets
    .map((match, index) => {
      const matchSigns = order
        .filter((sign) => match[sign] === "clicked")
        .join(";");

      return matchSigns ? `${index + 1}:${matchSigns}` : "";
    })
    .filter(Boolean)
    .join(",");

  const share = valid ? "valid" : "invalid";
  const product = couponType === "europatipset" ? 2 : 1;
  const url = `${baseUrl}?product=${product}&draw=${drawNumber}&signs=${encodeURIComponent(
    clickedKeys
  )}&share=${share}`;

  return url;
}
