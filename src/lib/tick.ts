const tick = (lengthInMs: number, abortSignal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    if (abortSignal?.aborted) {
      reject('aborted')
    }

    const timeoutId = setTimeout(resolve, lengthInMs)

    abortSignal?.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      reject('aborted')
    })
  })

export default tick
