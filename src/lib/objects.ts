import { O } from 'ts-toolbelt'
import { isObject } from './types/predicates'

export function getObjectKeys<Type extends {}>(obj: Type) {
  return Array.from(Object.keys(obj)) as Array<keyof Type>
}

export function setProp<Type extends {}, Key extends keyof Type>(
  obj: Type,
  propName: Key,
  value: Type[Key],
): Type {
  obj[propName] = value
  return obj
}

export function filterProps<Type extends {}, Keys extends keyof Type>(
  obj: Type,
  propNames: Array<Keys>,
): O.Required<Partial<Type>, O.RequiredKeys<Type>>
export function filterProps<Type extends {}, Keys extends keyof Type>(
  obj: Type,
  propNames: Keys,
): O.Required<Partial<Type>, O.RequiredKeys<Type>>
export function filterProps<Type extends {}>(
  obj: Type,
  propNames: any,
): O.Required<Partial<Type>, O.RequiredKeys<Type>> {
  if (!isObject(obj)) return obj

  if (!Array.isArray(propNames)) {
    propNames = [propNames]
  }

  const keys = getObjectKeys(obj)
  const newObj = keys.reduce<Partial<Type>>((memo, key) => {
    if (propNames.includes(key)) {
      memo = setProp(memo, key, obj[key])
    }
    return memo
  }, {})

  return newObj as O.Required<Partial<Type>, O.RequiredKeys<Type>>
}
