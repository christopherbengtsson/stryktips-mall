import { STRYKTIPS_URL } from "../Constants";
import { StryktipsResponse } from "./StryktipsResponse";

export class ApiService {
  initialized = false;

  async fetchLatestCoupon() {
    this.initialized = true;

    const url = STRYKTIPS_URL;
    const res = await fetch(url);
    const data: StryktipsResponse = await res.json();

    return data;
  }
}
