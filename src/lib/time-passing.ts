export default function timePassing(
  lengthInMs: number,
  abortSignal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (abortSignal?.aborted) {
      reject('aborted')
    }

    const timeoutId = setTimeout(resolve, lengthInMs)

    abortSignal?.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      // reject('aborted')
    })
  })
}

export async function* timeIterator({
  lengthInMs,
  maxRunTimeMs = Infinity,
  abortSignal,
}: {
  lengthInMs: number
  maxRunTimeMs?: number
  abortSignal: AbortSignal
}) {
  let tickCount = 0
  while (!abortSignal.aborted || tickCount * 1000 <= maxRunTimeMs) {
    yield ++tickCount

    await timePassing(lengthInMs, abortSignal)
  }
}
