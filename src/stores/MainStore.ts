import { makeAutoObservable, observable, runInAction } from "mobx";
import { ApiService, CouponType, StryktipsResponse } from "../api";
import { StorageService } from "./StorageService";
import { AnalysisResponse } from "../api/AnalysResponse";

export type FetchingState = "DONE" | "LOADING" | "ERROR";

export class MainStore {
  apiService: ApiService;
  storageService: StorageService;

  fetchingState: FetchingState = "LOADING";
  stryktipsResponse: StryktipsResponse | null = null;
  analysisResponse: AnalysisResponse | null = null;
  lastUpdated: Date | null = null;

  showAnalysis: boolean;

  constructor() {
    makeAutoObservable(this, {
      stryktipsResponse: observable.ref,

      apiService: false,
      storageService: false,
    });

    this.apiService = new ApiService();
    this.storageService = new StorageService();
    this.showAnalysis = this.storageService.showAnalysis;
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

  get gameAnalysis() {
    return this.analysisResponse?.result.at(0)?.gameAnalyses;
  }

  public async fetchState({
    couponType = "stryktipset",
    fetchAnalysis = this.showAnalysis,
    inBackground,
  }: {
    couponType?: CouponType;
    fetchAnalysis?: boolean;
    inBackground?: boolean;
  }) {
    if (!inBackground) {
      this.fetchingState = "LOADING";
    }

    try {
      const promises: [Promise<StryktipsResponse>, Promise<AnalysisResponse>?] =
        [this.apiService.fetchLatestCoupon(couponType)];

      if (fetchAnalysis) {
        promises.push(
          this.apiService.fetchLatestAnalyse(this.couponType, this.drawNumber)
        );
      }

      const [couponRes, analysisRes] = await Promise.all(promises);
      this.setCouponResponse(couponRes);

      if (analysisRes) {
        this.analysisResponse = analysisRes;
      }
    } catch (error) {
      console.error("Error fetching state", error);
      runInAction(() => {
        this.fetchingState = "ERROR";
      });
      throw new Error("Server/Network error");
    }
  }

  private setCouponResponse(response: StryktipsResponse) {
    this.stryktipsResponse = response;
    this.fetchingState = "DONE";
    this.lastUpdated = new Date();
  }

  private setupWindowActiveListener() {
    // Refetch state in background when user returns to tab
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        this.fetchState({ inBackground: true, couponType: this.couponType });
      }
    });
  }
}
