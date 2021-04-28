import { CopyBehavior, DecorateBehavior, LookUpBehavior, ShellTransformBehavior, WaitBehavior } from "./Behavior";

export interface IsResponse {
  is: Is;
  repeat?: number;
  behaviors?: Array<WaitBehavior | DecorateBehavior | ShellTransformBehavior | CopyBehavior | LookUpBehavior>;
}
export interface ProxyResponse {
  proxy: ProxyResponseDefinition;
}
interface ProxyResponseDefinition {
  to: string;
  mode?: string;
  key?: string;
  cert?: string;
  ciphers?: string;
  secureProtocol?: string;
  passphrase?: string;
  addWaitBehavior?: "true" | "false";
  addDecorateBehavior?: string;
  predicateGenerators: Array<Record<string, any>>;
  injectHeaders: Record<string, any>;
}
export interface InjectResponse {
  inject: string;
}

interface Is {
  statusCode?: number;
  headers?: Record<string, any>;
  body?: string | Record<string, any>;
  _mode?: string;
}
