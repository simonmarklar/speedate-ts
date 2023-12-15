import {
  useGameState,
  useDispatch as useGameStateDispatch,
} from '../../hooks/useGameState'

import { DateNightStateProvider } from '../../hooks/useDateNightState'
import TableForTwo from './components/TableForTwo'

export default function CoffeeShop() {
  const { difficulty } = useGameState()
  const dispatchGameAction = useGameStateDispatch()

  if (!difficulty) return null

  return (
    <DateNightStateProvider difficulty={difficulty}>
      <TableForTwo />
      <button
        onClick={() =>
          dispatchGameAction({ type: 'game.nextScreen', value: 'MENU' })
        }
      >
        Menu
      </button>
    </DateNightStateProvider>
  )
}

export const screenName: GameScreenName = 'DATE'
