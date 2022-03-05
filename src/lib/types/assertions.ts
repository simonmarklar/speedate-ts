import { AssertionError } from 'assert'

export function assert(value: unknown, message: string): asserts value {
  if (value == null) {
    throw new AssertionError({ message })
  }
}
