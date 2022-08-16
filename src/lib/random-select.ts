import { random } from 'lodash'

export default function makeRandomSelectIterator<T>(
  choices: T[],
): Iterator<T, T> {
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
