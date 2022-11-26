import { isPlainObject } from 'lodash'
import { assertExists } from './assertions'

////////////////////////
// type predicates

export function isGameState(
  state: { activeScreen: GameScreenName } | ConcreteGameState,
): state is ConcreteGameState {
  assertExists(
    'difficulty' in state && state.difficulty,
    'difficulty is required',
  )
  return true
}

export function isInitialGameState(
  state: IGameState | ConcreteGameState,
): state is Pick<IGameState, 'activeScreen'> {
  return state.difficulty == null
}

export function isObject(obj: unknown): obj is Record<PropertyKey, any> {
  return isPlainObject(obj)
}
