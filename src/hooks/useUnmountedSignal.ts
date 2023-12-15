import { useEffect, useRef } from 'react'
import logger from '../lib/log'

export default function useUnmountedSignal(componentName?: string) {
  const controllerRef = useRef(new AbortController())

  useEffect(() => {
    logger.debug(`${componentName} component mounting`)
    if (controllerRef.current.signal.aborted) {
      controllerRef.current = new AbortController()
    }
    const signal = controllerRef.current
    return () => {
      logger.debug(`${componentName} component unmounting`)
      signal.abort(`${componentName} component unmounting`)
    }
  }, [controllerRef.current.signal.aborted])

  return controllerRef.current.signal
}
