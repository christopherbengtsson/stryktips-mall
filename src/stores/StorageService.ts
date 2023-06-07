import { CouponType } from "../api";
import {
  getLocalStorage,
  isLocalStorageAvailable,
  setLocalStorage,
} from "../utils/storage";

export const initialSavedCoupon: Bets = [
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
];

export type BettingOption = 1 | "X" | 2;
export type BettingState = "clicked" | "unclicked" | "indeterminate";

export type Bet = Record<BettingOption, BettingState>;

export type Bets = Array<Bet>;
export type SavedCoupon = {
  drawNumber: number;
  bets: Bets;
};

export const BASE_KEY = "saved_strykis_";

export class StorageService {
  private _localStorageAvailable = false;

  constructor() {
    this._localStorageAvailable = isLocalStorageAvailable();
  }

  get localStorageAvailable(): boolean {
    return this._localStorageAvailable;
  }

  get showAnalysis() {
    if (!this.localStorageAvailable) {
      return false;
    }

    const saved = getLocalStorage(BASE_KEY + "showAnlysis");

    return saved === "true" ? true : false;
  }

  set showAnalysis(show: boolean) {
    setLocalStorage(BASE_KEY + "showAnlysis", String(show));
  }

  public getCouponType(): CouponType | null {
    if (!this.localStorageAvailable) {
      return null;
    }

    const couponType = getLocalStorage(BASE_KEY + "couponType");

    if (couponType) {
      return couponType as CouponType;
    }

    return null;
  }

  public setCouponType(couponType: CouponType) {
    setLocalStorage(BASE_KEY + "couponType", couponType);

    return couponType;
  }

  public getCoupon(drawNumber: number) {
    if (!this.localStorageAvailable) {
      return null;
    }

    const savedCoupon = getLocalStorage(BASE_KEY + drawNumber);

    if (!savedCoupon) {
      const { bets } = this.setBets(initialSavedCoupon, drawNumber);
      return { bets, drawNumber };
    }

    try {
      return JSON.parse(savedCoupon);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public setBets(bets: Bets, drawNumber: number) {
    const coupon: SavedCoupon = {
      drawNumber,
      bets,
    };
    setLocalStorage(BASE_KEY + drawNumber, JSON.stringify(coupon));

    return coupon;
  }
}
