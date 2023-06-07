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

  const url = `${baseUrl}?product=${getProduct(
    couponType
  )}&draw=${drawNumber}&signs=${encodeURIComponent(
    clickedKeys
  )}&share=${share}`;

  return url;
}

export function buildAnalysUrl({
  drawNumber,
  couponType,
}: {
  drawNumber: number;
  couponType: CouponType;
}) {
  return `https://api.spela.svenskaspel.se/content/2/basicfilter?routesDomain=partner&channel=web-mobile&contentType=cnt:drawAnalysis&count=20&domainCategories=svs-domain-sport-draws/${drawNumber},svs-domain-products/${getProduct(
    couponType
  )}&matchAllDomainCategories=true&offset=0&orderBy=rank&userSegment=0&_=${Date.now()}`;
}

const getProduct = (couponType: CouponType) =>
  couponType === "europatipset" ? 2 : 1;
