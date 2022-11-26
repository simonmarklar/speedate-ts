import { getDifficulty } from '../lib/difficulties'
import { screenName as dateScreen } from '../scenes/CoffeeShop'
import { O } from 'ts-toolbelt'
import { filterProps } from '../lib/objects'

export type GlobalAction =
  | Action<'game.nextScreen', GameScreenName>
  | Action<'game.start', GameDifficultyName>

export default function globalStateReducer(
  currentState: IGameState,
  action: GlobalAction,
) {
  if (!action.type) return currentState

  switch (action.type) {
    case 'game.nextScreen':
      return {
        ...currentState,
        activeScreen: action.value,
      }
    case 'game.start': {
      const difficulty = getDifficulty(action.value)

      const state: O.Required<
        IGameState,
        O.RequiredKeys<IGameState> | 'difficulty'
      > = {
        ...filterProps(currentState, 'nextScreen'),
        activeScreen: dateScreen,
        difficulty,
      }

      return state
    }
    default:
      return currentState
  }
}
