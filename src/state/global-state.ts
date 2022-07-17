import { getDifficulty } from '../lib/difficulties'

export type GlobalAction =
  | ActionWithNoValue<'game.toMenu'>
  | Action<'game.start', GameDifficultyName>

export default function globalStateReducer(
  currentState: IGameState,
  action: GlobalAction,
): IGameState {
  if (!action.type) return currentState

  switch (action.type) {
    case 'game.toMenu':
      return {
        activeScreen: 'MENU',
      }

    case 'game.start': {
      const difficulty = getDifficulty(action.value)

      const state: Required<IGameState> = {
        ...currentState,
        activeScreen: 'DATE',
        difficulty,
      }

      return state
    }
    default:
      return currentState
  }
}
