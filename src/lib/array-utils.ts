// create a sequence of numbers starting at 0
export function sequence(length: number = 0, start?: number): Array<number> {
  return Array.from(new Array((start ?? 0) + length).keys())
}
