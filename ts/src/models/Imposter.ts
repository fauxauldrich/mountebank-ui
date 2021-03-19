import { And, Contains, DeepEquals, EndsWith, Equals, Exists, Inject, Matches, Not, Or, StartsWith } from "./Predicate";
import { InjectResponse, IsResponse, ProxyResponse } from "./Response";

export interface Imposter {
  port: number;
  protocol: "http" | "https" | "tcp" | "smtp";
  name?: string;
  recordRequests?: "true" | "false";
  numberOfRequests?: number;
  key?: string;
  cert?: string;
  mutualAuth?: boolean;
  defaultResponse?: DefaultResponse;
  stubs?: Array<Stub>;
  endOfRequestResolver?: EndOfRequestResolver;
}

export interface DefaultResponse {
  statusCode: number;
  body?: string | Record<string, any>;
  headers?: Record<string, any>;
}
export interface Stub {
  responses: Array<IsResponse | ProxyResponse | InjectResponse>;
  predicates?: Array<Equals | DeepEquals | Contains | StartsWith | EndsWith | Matches | Exists | Or | Not | And | Inject>;
}

export interface EndOfRequestResolver {
  inject: string;
}
