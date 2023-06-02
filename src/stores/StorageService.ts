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

  private _drawNumber = -1;
  private _coupon: SavedCoupon | null = null;

  constructor() {
    this._localStorageAvailable = isLocalStorageAvailable();
  }

  get localStorageAvailable(): boolean {
    return this._localStorageAvailable;
  }

  set drawNumber(drawNumber: number) {
    this._drawNumber = drawNumber;
  }

  get savedCoupon(): SavedCoupon | null {
    if (!this.localStorageAvailable) return null;

    if (this._coupon) {
      return this._coupon;
    }

    const savedCoupon = getLocalStorage(BASE_KEY + this._drawNumber);

    if (!savedCoupon) {
      this.bets = initialSavedCoupon;
      return { bets: this.bets, drawNumber: this.drawNumber };
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

  set bets(bets: Bets) {
    const coupon: SavedCoupon = {
      drawNumber: this._drawNumber,
      bets,
    };
    setLocalStorage(BASE_KEY + this._drawNumber, JSON.stringify(coupon));
  }
}
