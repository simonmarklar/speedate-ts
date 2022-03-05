import React, { ReactNode, useContext, useReducer } from 'react'
import globalState, { GlobalAction } from '../state/global-state'

interface IGameStateContext {
  state: GlobalGameState
  dispatch: React.Dispatch<GlobalAction>
}

const initalGlobalState: GlobalGameState = {
  activeScreen: 'MENU',
}

const GameStateContext = React.createContext<IGameStateContext>({
  state: initalGlobalState,
  dispatch: () => undefined,
})

GameStateContext.displayName = 'GameStateContext'

export function GameStateProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(globalState, initalGlobalState)

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState(): GlobalGameState {
  const state = useContext(GameStateContext).state

  return state
}

export function useDispatch() {
  return useContext(GameStateContext).dispatch
}
