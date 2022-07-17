import { random } from 'lodash'

export default function makeRandomSelectIterator<T>(choices: T[]) {
  return {
    choices,
    next() {
      const index = random(this.choices.length - 1)

      return {
        value: this.choices[index],
        done: this.choices.length === 0,
      }
    },
  }
}
