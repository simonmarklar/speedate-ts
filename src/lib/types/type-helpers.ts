import { AssertionError } from 'assert'

export function assert(value: unknown, message: string): asserts value {
  if (value == null) {
    throw new AssertionError({ message })
  }
}

////////////////////////
// type predicates

export function isGameState(
  state: { activeScreen: GameScreenName } | ConcreteGameState,
): state is ConcreteGameState {
  assert('difficulty' in state && state.difficulty, 'difficulty is required')
  return true
}

export function isInitialGameState(
  state: IGameState | ConcreteGameState,
): state is Pick<IGameState, 'activeScreen'> {
  return state.difficulty == null
}
