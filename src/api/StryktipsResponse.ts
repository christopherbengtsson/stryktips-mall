import { CouponType } from '.';

export interface StryktipsResponse {
  draws: Draw[];
  error: any;
  requestInfo: RequestInfo;
  requestId: string;
  sessionId: any;
  deviceId: string;
  session: any;
  sessionUser: any;
  clientInfo: any;
}

export interface Draw {
  productName: string;
  seasonLastDraw: boolean;
  productId: number;
  currentNetSale: string;
  regCloseDescription: string;
  extraInfo: any;
  drawNumber: number;
  betIndex: number;
  drawState: string;
  drawStateId: number;
  regBetDisabled: string;
  regOpenTime: string;
  regCloseTime: string;
  cancelCloseTime: string;
  sport: Sport;
  drawComment: string;
  bombenDrawNum: number;
  relatedDraws: RelatedDraw[];
  rowPrice: string;
  fund: any;
  drawEvents: DrawEvent[];
  roomKeys: RoomKeys;
  retailerOpenTime: string;
  retailerCloseTime: string;
  retailerCancelCloseTime: string;
  lastDateWithoutTimeOfDay: string;
}

export interface Sport {
  id: number;
  type: number;
  name: string;
  numCountries: number;
}

export interface RelatedDraw {
  productId: number;
  drawNumber: number;
  regCloseTime: string;
}

export interface DrawEvent {
  cancelled: boolean;
  eventComment: string;
  eventDescription: string;
  extraInfo: any;
  eventNumber: number;
  eventTypeId: number;
  participantType: string;
  match: Match;
  odds?: Odds;
  favouriteOdds?: FavouriteOdds;
  startOdds: StartOdds;
  betMetrics: BetMetrics;
  complementaryBetMetrics: any[];
  outcomes: any;
  svenskaFolket: SvenskaFolket;
  tioTidningarsTips: TioTidningarsTips;
  providerIds: ProviderId[];
}

export interface Match {
  matchId: number;
  matchStart: string;
  status: string;
  statusId: number;
  sportEventStatus: string;
  statusTime: string;
  coverage: number;
  participants: Participant[];
  league: League;
  leagueTable: any;
  result: any[];
  media: any;
  mutuals: any;
}

export interface Participant {
  id: number;
  type: string;
  name: string;
  trend: number;
  goalAvg: any;
  shortName: string;
  mediumName: string;
  countryId: number;
  countryName: string;
  isoCode: string;
  managerId: number;
  arenaId: number;
}

export interface League {
  id: number;
  uniqueLeagueId: number;
  name: string;
  shortName: any;
  country: Country;
  code: any;
  printAbbreviation: any;
  season: any;
  doShow: boolean;
  isHome: boolean;
  legacyKey: number;
  numTeams: number;
  popular: boolean;
  rank: number;
}

export interface Country {
  id: number;
  name: string;
  isoCode: string;
  population: number;
}

export interface Odds {
  one: string;
  x: string;
  two: string;
}

export interface FavouriteOdds {
  one: string;
  x: string;
  two: string;
}

export interface StartOdds {
  one: string;
  x: string;
  two: string;
}

export interface BetMetrics {
  eventTypeId: number;
  eventType: string;
  eventSubTypeId: number;
  eventSubType: string;
  distributionDate: string;
  distributionRefDate: string;
  values: Value[];
}

export interface Value {
  outcome: string;
  odds: Odds2;
  distribution: Distribution;
}

export interface Odds2 {
  odds: string;
  favouriteOdds: string;
  startOdds: string;
}

export interface Distribution {
  distribution: string;
  refDistribution: string;
}

export interface SvenskaFolket {
  one: string;
  x: string;
  two: string;
  date: string;
  refOne: string;
  refX: string;
  refTwo: string;
  refDate: string;
}

export interface TioTidningarsTips {
  one: number;
  x: number;
  two: number;
}

export interface ProviderId {
  provider: string;
  type: string;
  id: string;
}

export interface RoomKeys {
  keys: string[];
  timeToLive: string;
}

export interface RequestInfo {
  elapsedTime: number;
  apiVersion: number;
}
