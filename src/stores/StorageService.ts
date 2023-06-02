import { Indeterminate } from "../components/BetButton";
import {
  getLocalStorage,
  isLocalStorageAvailable,
  setLocalStorage,
} from "../utils/storage";

export const initialSavedCoupon: Bets = {
  1: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  2: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  3: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  4: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  5: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  6: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  7: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  8: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  9: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  10: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  11: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  12: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
  13: {
    1: "unclicked",
    X: "unclicked",
    2: "unclicked",
  },
};

export type Key = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type Bet = {
  1: Indeterminate;
  X: Indeterminate;
  2: Indeterminate;
};
export type Bets = Record<number, Bet>;
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
