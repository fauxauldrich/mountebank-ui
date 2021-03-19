import { CopyBehavior, DecorateBehavior, LookUpBehavior, ShellTransformBehavior, WaitBehavior } from "./Behavior";

export interface IsResponse {
  is: Is;
  repeat?: number;
  behaviors?: Array<WaitBehavior | DecorateBehavior | ShellTransformBehavior | CopyBehavior | LookUpBehavior>;
}
export interface ProxyResponse {}
export interface InjectResponse {
  inject: string;
}

interface Is {
  statusCode?: number;
  headers?: Record<string, any>;
  body?: string | Record<string, any>;
  _mode?: string;
}
