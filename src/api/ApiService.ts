import { EUROPATIPS_URL, STRYKTIPS_URL } from '../Constants';
import { buildAnalysUrl } from '../utils/stryktipsUrl';
import { AnalysisResponse } from './AnalysResponse';
import { StryktipsResponse } from './StryktipsResponse';

export type CouponType = 'stryktipset' | 'europatipset';
export class ApiService {
  initialized = false;

  async fetchLatestCoupon(couponType: CouponType) {
    this.initialized = true;

    const url = couponType === 'europatipset' ? EUROPATIPS_URL : STRYKTIPS_URL;
    const res = await fetch(url);
    const data: StryktipsResponse = await res.json();

    return data;
  }

  async fetchLatestAnalyse(couponType: CouponType, drawNumber: number) {
    this.initialized = true;

    const url = buildAnalysUrl({ couponType, drawNumber });
    const res = await fetch(url);
    const data: AnalysisResponse = await res.json();

    return data;
  }
}
