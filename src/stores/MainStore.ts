import { makeAutoObservable, observable, runInAction } from 'mobx';
import { ApiService, CouponType, StryktipsResponse } from '../api';
import { StorageService } from './StorageService';
import { AnalysisResponse } from '../api/AnalysResponse';
import { ResultDate } from '../api/DatePickerResponse';
import { CouponResultResponse } from '../api/CouponResultResponse';

export type FetchingState = 'DONE' | 'LOADING' | 'ERROR';

export class MainStore {
  apiService: ApiService;
  storageService: StorageService;

  fetchingState: FetchingState = 'LOADING';
  stryktipsResponse: StryktipsResponse | null = null;
  analysisResponse: AnalysisResponse | null = null;
  couponDatesResponse: ResultDate[] | null = null;
  couponResultResponse: CouponResultResponse | null = null;

  lastUpdated: Date | null = null;

  constructor() {
    makeAutoObservable(this, {
      stryktipsResponse: observable.ref,
      analysisResponse: observable.ref,

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
    if (this.fetchingState === 'LOADING') {
      return true;
    }

    return false;
  }

  get couponType() {
    return this.storageService.getCouponType() ?? 'stryktipset';
  }

  get drawNumber() {
    return this.resultResponse?.result?.drawNumber ?? this.draws?.at(0)?.drawNumber;
  }

  get draws() {
    return this.stryktipsResponse?.draws;
  }

  get showGameAnalysis() {
    return this.storageService.showAnalysis;
  }

  get gameAnalysis() {
    return this.analysisResponse?.result.at(0)?.gameAnalyses;
  }

  get couponDates() {
    return this.couponDatesResponse?.map(({ date }) => new Date(date).getTime());
  }

  get dateResponse() {
    return this.couponDatesResponse;
  }

  get resultResponse() {
    return this.couponResultResponse;
  }

  async fetchCouponDates(date = new Date()) {
    try {
      const res = await this.apiService.fetchDatePickerData(this.couponType, date);
      runInAction(() => (this.couponDatesResponse = res.resultDates));
    } catch (error) {
      console.error('Error fetching coupon dates', error);
    }
  }

  async fetchResult(drawNumber: number) {
    try {
      const res = await this.apiService.fetchResult(this.couponType, drawNumber);
      runInAction(() => {
        this.couponResultResponse = res;
      });
    } catch (error) {
      console.error('Error fetching result', error);
      runInAction(() => {
        this.fetchingState = 'ERROR';
      });
      throw new Error('Server/Network error');
    }
  }

  clearResults() {
    this.couponResultResponse = null;
  }

  public async fetchState({
    couponType = 'stryktipset',
    fetchAnalysis = this.showGameAnalysis,
    inBackground,
  }: {
    couponType?: CouponType;
    fetchAnalysis?: boolean;
    inBackground?: boolean;
  }) {
    if (!inBackground) {
      this.fetchingState = 'LOADING';
    }

    try {
      const couponRes = await this.fetchCoupon(couponType);
      this.setCouponResponse(couponRes);

      const drawNumber = couponRes.draws.at(0)?.drawNumber;
      if (drawNumber && fetchAnalysis) {
        const analysRes = await this.fetchAnalysis(drawNumber);
        runInAction(() => (this.analysisResponse = analysRes));
      }
    } catch (error) {
      console.error('Error fetching state', error);
      runInAction(() => {
        this.fetchingState = 'ERROR';
      });
      throw new Error('Server/Network error');
    }
  }

  private fetchCoupon(couponType: CouponType) {
    return this.apiService.fetchLatestCoupon(couponType);
  }

  private fetchAnalysis(drawNumber: number) {
    return this.apiService.fetchLatestAnalyse(this.couponType, drawNumber);
  }

  private setCouponResponse(response: StryktipsResponse) {
    this.stryktipsResponse = response;
    this.fetchingState = 'DONE';
    this.lastUpdated = new Date();
  }

  private setupWindowActiveListener() {
    // Refetch state in background when user returns to tab
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'visible') {
        this.fetchState({ inBackground: true, couponType: this.couponType });
      }
    });
  }
}
