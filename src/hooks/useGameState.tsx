import React, { ReactNode, useContext, useReducer } from 'react'
import globalState, { GlobalAction } from '../state/global-state'
import { useAsyncAction } from './useAsyncAction'

type ActionsWithNoValue = ActionTypesWithNoValue<GlobalAction>

interface IGameStateContext<T extends IGameState> {
  state: T
  dispatch: React.Dispatch<GlobalAction>
  asyncAction: <T>(action: T) => any
}

const GameStateContext = React.createContext<IGameStateContext<IGameState>>({
  state: {
    activeScreen: 'MENU',
  },
  dispatch: () => undefined,
  asyncAction: () => undefined,
})

GameStateContext.displayName = 'GameStateContext'

export function GameStateProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(globalState, {
    activeScreen: 'MENU',
  })

  const asyncAction = useAsyncAction(dispatch)

  return (
    <GameStateContext.Provider value={{ state, dispatch, asyncAction }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const state = useContext(GameStateContext).state

  return state
}

export function useDispatch() {
  const { dispatch } = useContext(GameStateContext)

  const handleActions = <
    T extends GlobalAction['type'] | ((action: any) => any),
  >(
    action: T extends Function ? any : GlobalAction,
  ) => {
    console.log(action)
    if (typeof action === 'function') {
      return action(handleActions)
    } else {
      dispatch(action)
    }
  }

  return React.useCallback(handleActions, [dispatch])
}

export function useDateNightAsyncAction() {
  const { asyncAction } = useContext(GameStateContext)

  return asyncAction
}
