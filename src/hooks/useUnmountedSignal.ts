import { useEffect, useMemo } from 'react'

export default function useUnmountedSignal() {
  const controller = useMemo(() => new AbortController(), [])

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [controller])

  return controller.signal
}
