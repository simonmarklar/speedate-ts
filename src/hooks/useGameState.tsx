import React, { ReactNode, useContext, useReducer } from 'react'
import globalState, { GlobalAction } from '../state/global-state'

interface IGameStateContext<T extends IGameState> {
  state: T
  dispatch: React.Dispatch<GlobalAction>
}

const GameStateContext = React.createContext<IGameStateContext<IGameState>>({
  state: {
    activeScreen: 'MENU',
  },
  dispatch: () => undefined,
})

GameStateContext.displayName = 'GameStateContext'

export function GameStateProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(globalState, {
    activeScreen: 'MENU',
  })

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const state = useContext(GameStateContext).state

  return state
}

export function useDispatch() {
  return useContext(GameStateContext).dispatch
}
