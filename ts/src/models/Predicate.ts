export interface Equals {
  equals: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface DeepEquals {
  deepEquals: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface Contains {
  contains: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface StartsWith {
  startsWith: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface EndsWith {
  endsWith: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface Matches {
  matches: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface Exists {
  exists: Conditions;
  caseSensitive?: boolean;
  except?: string;
  xpath?: string;
  jsonpath?: string;
}
export interface Not {
  not: Equals | DeepEquals | Contains | StartsWith | EndsWith | Matches | Exists;
}
export interface Or {
  or: Array<Equals | DeepEquals | Contains | StartsWith | EndsWith | Matches | Exists>;
}
export interface And {
  and: Array<Equals | DeepEquals | Contains | StartsWith | EndsWith | Matches | Exists>;
}
export interface Inject {
  inject: string;
}

interface Conditions {
  method?: string | boolean;
  path?: string | boolean;
  query?: Record<string, any>;
  headers?: Record<string, any>;
  body?: string | Record<string, any> | boolean;
  data?: string | boolean;
}
