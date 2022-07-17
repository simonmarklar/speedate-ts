import { random } from 'lodash'

export default function makeRandomPlucker<T>(sourceArr: T[]) {
  let pool: T[] = [...sourceArr]
  return {
    next() {
      if (!pool.length) {
        return {
          done: true,
        }
      }
      const selectedIndex = random(pool.length - 1)
      pool = pool.filter((i, index) => index === selectedIndex)

      return {
        value: pool[selectedIndex],
        done: pool.length === 0,
      }
    },
  }
}
