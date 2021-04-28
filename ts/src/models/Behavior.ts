export interface WaitBehavior {
  wait: number;
}
export interface DecorateBehavior {
  decorate: string;
}
export interface ShellTransformBehavior {
  shellTransform: string;
}
export interface CopyBehavior {
  copy: CopyBehaviorDefinition;
}
export interface CopyBehaviorDefinition {
  from: string;
  into: string;
  using: Using;
}
export interface LookUpBehavior {
  lookup: LookUpBehaviorDefinition;
}
export interface LookUpBehaviorDefinition {
  key: Key;
  fromDataSource: FromDataSource;
  into: string;
}

interface Using {
  method: "xpath" | "jsonpath" | "regex";
  selector: string;
  ns?: Record<string, any>;
  options?: Options;
}
interface Options {
  ignoreCase: boolean;
  multiline: boolean;
}

interface Key {
  from: string | Record<string, any>;
  using: Using;
  index: number;
}

interface FromDataSource {
  csv: CSV;
}

interface CSV {
  path: string;
  keyColumn: string;
  delimiter: string;
}
