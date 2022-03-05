import { useGameState } from '../../hooks/useGameState'
import { DateNightStateProvider } from '../../hooks/useDateNightState'
import TableForTwo from './TableForTwo'

export default function CoffeeShop() {
  const { difficulty } = useGameState()

  if (!difficulty) return null

  return (
    <DateNightStateProvider difficulty={difficulty}>
      <TableForTwo />
    </DateNightStateProvider>
  )
}
