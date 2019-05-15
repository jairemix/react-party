export interface Dictionary<T> {
  [K: string]: T;
}

/**
 * same as Dictionary, except keys of a string subtype can be specified
 */
export type DictionaryWithKeys<K extends string, V> = {
  [K2 in K]: V;
}
