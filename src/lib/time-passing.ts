import logger from "./log"

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
  iterId = new Date().getTime().toString()
}: {
  lengthInMs: number
  maxRunTimeMs?: number
  abortSignal: AbortSignal
  iterId?: string
}) {
  let tickCount = 0
  do  {
    tickCount += 1
    logger.debug(`${iterId} tick #: ${tickCount}, currentTime: ${(tickCount) * 1000} max time: ${maxRunTimeMs} isRunning: ${(tickCount + 1) * 1000 <= maxRunTimeMs}`)
    await timePassing(lengthInMs, abortSignal)
    yield tickCount
  } while ((tickCount + 1) * 1000 <= maxRunTimeMs && !abortSignal.aborted )
}
