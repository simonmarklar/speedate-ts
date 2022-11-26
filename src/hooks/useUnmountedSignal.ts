import { useEffect, useRef } from 'react'

export default function useUnmountedSignal(componentName?: string) {
  const controllerRef = useRef(new AbortController())

  useEffect(() => {
    console.log(`${componentName} component mounting`)
    if (controllerRef.current.signal.aborted) {
      controllerRef.current = new AbortController()
    }
    const signal = controllerRef.current
    return () => {
      console.log(`${componentName} component unmounting`)
      signal.abort(`${componentName} component unmounting`)
    }
  }, [controllerRef.current.signal.aborted])

  return controllerRef.current.signal
}
