import { random } from 'lodash'

export function makeRandomSelectIterator<Type>(
  choices: Array<Type>,
): Iterator<Type, Type> {
  return {
    next() {
      const index = random(choices.length - 1)

      return {
        value: choices[index],
        done: choices.length === 0,
      }
    },
  }
}

export function makeRandomPlucker<Type>(
  sourceArr: Array<Type>,
): Iterator<Type> {
  let pool: Type[] = [...sourceArr]
  return {
    next() {
      const selectedIndex = random(pool.length - 1)
      const value = pool[selectedIndex]
      pool = pool.splice(selectedIndex, 1)

      return {
        value,
        done: pool.length === 0,
      }
    },
  }
}
