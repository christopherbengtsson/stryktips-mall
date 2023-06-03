import { makeAutoObservable, observable, runInAction } from "mobx";
import { ApiService, CouponType, StryktipsResponse } from "../api";
import { StorageService } from "./StorageService";

export type FetchingState = "DONE" | "LOADING" | "ERROR";

export class MainStore {
  apiService: ApiService;
  storageService: StorageService;

  fetchingState: FetchingState = "LOADING";
  stryktipsResponse: StryktipsResponse | null = null;

  lastUpdated: Date | null = null;

  constructor() {
    makeAutoObservable(this, {
      stryktipsResponse: observable.ref,
      apiService: false,
      storageService: false,
    });

    this.apiService = new ApiService();
    this.storageService = new StorageService();
  }

  public async init() {
    await this.fetchState({ couponType: this.couponType });

    this.setupWindowActiveListener();
  }

  get isLoading() {
    if (!this.drawNumber || this.fetchingState === "LOADING") {
      return true;
    }

    return false;
  }

  get couponType() {
    return this.storageService.getCouponType() ?? "stryktipset";
  }

  get drawNumber() {
    return this.draws?.at(0)?.drawNumber ?? -1;
  }

  get draws() {
    return this.stryktipsResponse?.draws;
  }

  public async fetchState({
    couponType = "stryktipset",
    inBackground,
  }: {
    couponType?: CouponType;
    inBackground?: boolean;
  }) {
    if (!inBackground) {
      this.fetchingState = "LOADING";
    }

    try {
      const response = await this.apiService.fetchLatestCoupon(couponType);
      this.setApiResponse(response);
    } catch (error) {
      console.error("Error fetching state", error);
      runInAction(() => {
        this.fetchingState = "ERROR";
      });
      throw new Error("Server/Network error");
    }
  }

  private setApiResponse(response: StryktipsResponse) {
    this.stryktipsResponse = response;
    this.fetchingState = "DONE";
    this.lastUpdated = new Date();
  }

  private setupWindowActiveListener() {
    // Refetch state in background when user returns to tab
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        this.fetchState({ inBackground: true });
      }
    });
  }
}
