import { EUROPATIPS_URL, STRYKTIPS_URL } from "../Constants";
import { StryktipsResponse } from "./StryktipsResponse";

export type CouponType = "stryktipset" | "europatipset";
export class ApiService {
  initialized = false;

  async fetchLatestCoupon(type: CouponType) {
    this.initialized = true;

    const url = type === "europatipset" ? EUROPATIPS_URL : STRYKTIPS_URL;
    const res = await fetch(url);
    const data: StryktipsResponse = await res.json();

    return data;
  }
}
