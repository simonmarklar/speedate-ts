import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'
import Menu, { screenName as menuScreenName } from '../scenes/Menu'
import CoffeeShop, { screenName as dateScreenName } from '../scenes/CoffeeShop'
import Switch from '../components/Switch'
import useRemoveComponentIfSafe from '../hooks/useRemoveComponentIfSafe'
import { useGameState } from '../hooks/useGameState'
import { AnimatePresence } from 'framer-motion'

const screenAnimations: Variants = {
  initial: {
    x: '100vw',
  },
  enter: {
    x: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.25,
      delay: 0.1,
      when: 'afterChildren',
    },
  },
  exit: {
    x: '100vw',
    transition: {
      ease: 'circOut',
      duration: 0.5,
      when: 'before Children',
    },
  },
}

const ScreenContainer = styled(motion.div)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
`
Screen.displayName = 'Screen'

function Screen({ name }: { name: GameScreenName }) {
  useRemoveComponentIfSafe()

  return (
    <ScreenContainer
      variants={screenAnimations}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Switch value={name}>
        <Switch.Case value={menuScreenName} key={menuScreenName}>
          <Menu />
        </Switch.Case>
        <Switch.Case value={dateScreenName} key={dateScreenName}>
          <CoffeeShop />
        </Switch.Case>
      </Switch>
    </ScreenContainer>
  )
}

export default function ScreenSelector() {
  const state = useGameState()

  return (
    <AnimatePresence initial={false} mode="wait">
      <Screen name={state.activeScreen} key={state.activeScreen} />
    </AnimatePresence>
  )
}
