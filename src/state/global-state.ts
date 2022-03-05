import { getDifficulty } from './lib/difficulties'

export type GlobalAction =
  | ActionWithNoValue<'game.toMenu'>
  | ActionWithValue<'game.start', GameDifficultyName>

export default function globalStateReducer(
  currentState: GlobalGameState,
  action: GlobalAction,
): GlobalGameState {
  if (!action.type) return currentState

  switch (action.type) {
    case 'game.toMenu':
      return {
        activeScreen: 'MENU',
      }

    case 'game.start': {
      const difficulty = getDifficulty(action.value)

      return {
        ...currentState,
        activeScreen: 'DATE',
        difficulty,
      }
    }
    default:
      return currentState
  }
}
