export interface CouponResultResponse {
  error: null;
  requestInfo: RequestInfo;
  requestId: string;
  sessionId: null;
  deviceId: string;
  session: null;
  sessionUser: null;
  clientInfo: null;
  result: Result;
}

export interface RequestInfo {
  elapsedTime: number;
  apiVersion: number;
}

export interface Result {
  cancelled: boolean;
  events: EventResult[];
  distribution: Distribution[];
  sport: Sport;
  productName: string;
  productId: number;
  drawNumber: number;
  currentNetSale: string;
  regCloseTime: Date;
}

export interface Distribution {
  winDiv: number;
  winSet: number;
  winners: number;
  amount: string;
  name: string;
}

export interface EventResult {
  eventNumber: number;
  eventComment: string;
  eventDescription: string;
  cancelled: boolean;
  outcome: string;
  outcomeDescription: null;
  outcomeScore: OutcomeScore;
  matchId: number;
  participants: Participant[];
}

export interface OutcomeScore {
  home: number;
  away: number;
}


export interface Participant {
  id: number;
  type: Type;
  name: string;
  trend: number;
  goalAvg: null;
  shortName: string;
  mediumName: string;
  countryId: number;
  countryName: CountryName;
  isoCode: ISOCode;
  managerId: number;
  arenaId: number;
}

export type CountryName = 'England' | 'Italien' | 'Sverige' | 'Island';

export type ISOCode = 'ENG' | 'ITA' | 'SWE' | 'ISL';

export type Type = 'home' | 'away';

export interface Sport {
  id: number;
  type: number;
  name: string;
  numCountries: number;
}
