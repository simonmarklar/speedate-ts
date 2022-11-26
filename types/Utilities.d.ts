import { O } from 'ts-toolbelt'

type Difference<Source extends {}, Target extends {}> = Pick<
  Source,
  Exclude<keyof Source, keyof Target>
>

type ExcludedSubsetOf<Source extends {}, T extends {}> = Pick<
  SubsetOf<Source, T>,
  keyof T
>

// expands object types one level deep
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

// expands object types recursively
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

type EmptyObject = {
  [K in unknown]: never
}

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

type isObjectKey<O extends {}, PropName extends string> = {
  [Key in keyof O]: Key extends PropName ? Key : never
}[string]

// (
//   propName: infer Key,
//   obj: O,
// ) => O[Key] extends never ? never : Key
