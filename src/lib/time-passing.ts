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
      reject('aborted')
    })
  })
}
