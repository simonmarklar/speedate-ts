import Screen from './scenes/Screen'
import { GameStateProvider } from './hooks/useGameState'
import styled from 'styled-components'

const View = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

function App() {
  return (
    <View>
      <GameStateProvider>
        <Screen />
      </GameStateProvider>
    </View>
  )
}

export default App
