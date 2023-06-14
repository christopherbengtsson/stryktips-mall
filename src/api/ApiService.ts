import { EUROPATIPS_URL, RESULT_DATEPICKER_BASE_URL, STRYKTIPS_URL } from '../Constants';
import { buildAnalysUrl } from '../utils/stryktipsUrl';
import { AnalysisResponse } from './AnalysResponse';
import { CouponResultResponse } from './CouponResultResponse';
import { DatePickerResponse } from './DatePickerResponse';
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
    const url = buildAnalysUrl({ couponType, drawNumber });
    const res = await fetch(url);
    const data: AnalysisResponse = await res.json();

    return data;
  }

  async fetchDatePickerData(couponType: CouponType, date: Date) {
    const params = new URLSearchParams();
    params.append('product', couponType);
    params.append('year', date.getFullYear().toString());
    params.append('month', (date.getMonth() + 1).toString());

    const res = await fetch(`${RESULT_DATEPICKER_BASE_URL}?${params}`);
    const data: DatePickerResponse = await res.json();

    return data;
  }

  async fetchResult(couponType: CouponType, drawNumber: number) {
    const url = `https://api.spela.svenskaspel.se/draw/1/${couponType}/draws/${drawNumber}/result`;

    const res = await fetch(url);
    const data: CouponResultResponse = await res.json();

    return data;
  }
}
