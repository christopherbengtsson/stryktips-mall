import { makeAutoObservable, observable, runInAction } from "mobx";
import { ApiService, StryktipsResponse } from "../api";

export type FetchingState = "DONE" | "LOADING" | "ERROR";

export class MainStore {
  apiService: ApiService;

  fetchingState: FetchingState = "LOADING";
  stryktipsResponse: StryktipsResponse | null = null;

  lastUpdated: Date | null = null;

  constructor() {
    makeAutoObservable(this, {
      stryktipsResponse: observable.ref,
      apiService: false,
    });

    this.apiService = new ApiService();
  }

  public async init() {
    await this.fetchState();
    this.setupWindowActiveListener();
  }

  get isLoading() {
    return false;
  }

  get draws() {
    return this.stryktipsResponse?.draws;
  }

  public async fetchState(inBackground?: boolean) {
    if (!inBackground) {
      this.fetchingState = "LOADING";
    }

    try {
      const response = await this.apiService.fetchLatestCoupon();
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
        this.fetchState(true);
      }
    });
  }
}
