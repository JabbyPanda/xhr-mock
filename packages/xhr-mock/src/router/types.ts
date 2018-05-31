export interface MockHeaders {
  [name: string]: string;
}

export interface MockRequest {
  version: string;
  method: string;
  uri: string;
  headers: MockHeaders;
  body: any;
}

export interface MockRequestParams {
  [name: string]: string;
}

export interface MockRequestWithParams extends MockRequest {
  params: MockRequestParams;
}

export interface MockResponse {
  version: string;
  status: number;
  reason: string;
  headers: MockHeaders;
  body: any;
}

export interface MockContext {}

export interface MockContextWithSync {
  sync: boolean;
}

export type MockMethodCriteria = string;
export type MockURICriteria = string | RegExp;

export type MockHandler = (
  req: MockRequest,
  ctx: MockContextWithSync
) =>
  | Partial<MockResponse>
  | undefined
  | Promise<Partial<MockResponse> | undefined>;

export type MockBeforeCallbackEvent = {
  req: MockRequest;
  ctx: MockContextWithSync;
};
export type MockBeforeCallback = (event: MockBeforeCallbackEvent) => void;

export type MockAfterCallbackEvent = {
  req: MockRequest;
  res: MockResponse;
  ctx: MockContextWithSync;
};
export type MockAfterCallback = (event: MockAfterCallbackEvent) => void;

export type MockErrorCallbackEvent = {
  req: MockRequest;
  err: Error;
  ctx: MockContextWithSync;
};
export type MockErrorCallback = (event: MockErrorCallbackEvent) => void;
