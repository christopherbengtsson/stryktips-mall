export interface AnalysisResponse {
  error: any;
  searchTime: number;
  totalCount: number;
  result: Result[];
  requestId: string;
  deviceId: string;
  requestInfo: RequestInfo;
}

export interface Result {
  body: string;
  ingress: string;
  properties: Properties;
  authorProfile: AuthorProfile;
  gameAnalyses: GameAnalyse[];
  id: string;
  contentType: string;
  version: string;
  name: string;
  title: string;
  created: string;
  modified: string;
  published: string;
  rank: number;
  parentId: string;
  parentName: string;
  parentType: string;
  domainCategories: string[];
}

export interface Properties {
  cnt_gameSystems: string[];
}

export interface AuthorProfile {
  properties: unknown;
  authorLongName: string;
  authorShortName: string;
  authorPresentation: string;
  id: string;
  contentType: string;
  version: string;
  name: string;
  created: string;
  modified: string;
  published: string;
  rank: number;
  parentId: string;
  parentName: string;
  parentType: string;
  images: Image[];
  domainCategories: string[];
}

export interface Image {
  typeName: string;
  width: number;
  height: number;
  url: string;
  availableWidths: number[];
  availableFormats: AvailableFormat[];
  versionLabel: string;
}

export interface AvailableFormat {
  mimetype: string;
  extension: string;
}

export interface GameAnalyse {
  body: string;
  properties: Properties3;
  id: string;
  contentType: string;
  version: string;
  name: string;
  title: string;
  created: string;
  modified: string;
  published?: string;
  rank: number;
  parentId: string;
  parentName: string;
  parentType: string;
  domainCategories: string[];
}

export interface Properties3 {
  cnt_eventNumber: number;
  cnt_gamePrediction: string;
}

export interface RequestInfo {
  transportProcessTime: number;
  backendProcessTime: number;
  channel: string;
  elapsedTime: number;
  apiVersion: number;
}
