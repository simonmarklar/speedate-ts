import React, { useRef } from 'react'

import styled from 'styled-components'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import tableImg from './table.png'
import background from './bg.jpg'
import cardAreaBg from './green-felt.jpg'

import Player from '../../../characters/guys'
import YourDate from './YourDate'
import PlayersCards from './PlayersCards'
import { useDateNightState } from '../../../hooks/useDateNightState'
import Timer from './Timer'
import { useGameState } from '../../../hooks/useGameState'

const TableContainer = styled.div`
  background: url(${tableImg}) no-repeat center center;
  width: 100vw;
  height: 143px;
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
`

const Table = motion(
  React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => {
      return <TableContainer ref={ref}>{children}</TableContainer>
    },
  ),
)

Table.displayName = 'Table'

const Scene = styled(motion.div)`
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  overflow: hidden;
  position: relative;
  background: url(${background}) center top;
  background-repeat: round;
  background-size: cover;
`
Scene.displayName = 'Scene'

const People = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  flex-direction: row;
`

const CardArea = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1rem 2rem;
  background: url(${cardAreaBg}) center center;
  background-size: contain;
  height: 20vh;
`
CardArea.displayName = 'CardArea'

const dateAnimationVariants: Variants = {
  initial: {
    x: 5000,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 3,
      delay: 1.75,
    },
  },
  exit: {
    x: 5000,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 3,
      delay: 0,
    },
  },
}

export default function TableForTwo() {
  const discardCardDropTargetRef = useRef<HTMLDivElement>(null)
  const { datePhase } = useDateNightState()
  const { difficulty } = useGameState()

  return (
    <>
      <Scene>
        <AnimatePresence>
          <Timer
            dateLength={difficulty?.gameParams.timeLimit}
            isOn={datePhase === 'ACTIVE'}
          />
        </AnimatePresence>
        <People>
          <Player spriteId={difficulty?.name} />
          <AnimatePresence>
            {datePhase === 'ACTIVE' && (
              <motion.div
                variants={dateAnimationVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {' '}
                <YourDate />
              </motion.div>
            )}
          </AnimatePresence>
        </People>
        <Table ref={discardCardDropTargetRef} />
      </Scene>

      <CardArea>
        <PlayersCards discardTarget={discardCardDropTargetRef} />
      </CardArea>
    </>
  )
}
