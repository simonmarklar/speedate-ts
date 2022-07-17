// create a sequence of numbers starting at 0
export const sequence = (length: number = 0): Array<number> =>
  Array.from(new Array(length).keys())
