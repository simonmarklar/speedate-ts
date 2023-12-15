import { useCallback } from 'react'

export function useAsyncAction<Action>(
  dispatch: React.Dispatch<Action>,
) {
  const asyncAction = useCallback(function (action: any) {
    if (typeof action === 'function') {
      return action(asyncAction)
    } else {
      dispatch(action)
    }
  }, [dispatch])

  return asyncAction
}
