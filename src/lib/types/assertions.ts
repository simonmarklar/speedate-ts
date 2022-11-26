import { AssertionError } from 'assert'

export function assertExists(value: unknown, message: string): asserts value {
  if (value == null) {
    throw new AssertionError({ message })
  }
}
