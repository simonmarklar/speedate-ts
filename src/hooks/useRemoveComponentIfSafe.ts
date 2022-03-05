import { usePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function useRemoveComponentIfSafe() {
  const [isPresent, safeToRemove] = usePresence()
  useEffect(() => {
    if (!isPresent && safeToRemove) {
      safeToRemove()
    }
  }, [isPresent, safeToRemove])
}
