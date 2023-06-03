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

  private _coupon: SavedCoupon | null = null;

  constructor() {
    this._localStorageAvailable = isLocalStorageAvailable();
  }

  get localStorageAvailable(): boolean {
    return this._localStorageAvailable;
  }

  public getCoupon(drawNumber: number) {
    if (!this.localStorageAvailable) {
      return null;
    }

    if (this._coupon) {
      return this._coupon;
    }

    const savedCoupon = getLocalStorage(BASE_KEY + drawNumber);

    if (!savedCoupon) {
      const { bets } = this.setBets(initialSavedCoupon, drawNumber);
      return { bets, drawNumber };
    }

    try {
      const coupon = JSON.parse(savedCoupon);
      this._coupon = coupon;
      return this._coupon;
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
