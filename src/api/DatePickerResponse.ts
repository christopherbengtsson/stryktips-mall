import { CouponType } from ".";

export interface DatePickerResponse {
  resultDates: ResultDate[];
}

export interface ResultDate {
  date: string;
  openDate?: string;
  closeDate: string;
  product: CouponType;
  drawNumber: number;
  drawState: string;
  drawStateId: number;
}
