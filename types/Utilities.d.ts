// Gets a list of keys whos values are objects
type KeyHasObjectValue<T> = {
  [K in keyof T]: NonNullable<T[K]> extends { [key: string]: any } ? K : never
}[keyof T]

type Unionise<T extends object> = {
  [k in keyof T]: { k: k; v: T[k] }
}[keyof T]

type UnionKeys<T> = T extends any ? keyof T : never
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>>
  : never
type StrictUnion<T> = StrictUnionHelper<T, T>
