import React, { useRef } from 'react'

import styled from 'styled-components'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

import tableImg from './table.png'
import background from './bg.jpg'
import cardAreaBg from './green-felt.jpg'

import Player from '../../../characters/guys'
import YourDate from './YourDate'
import PlayersCards from './PlayersCards'
import {
  useDateNightDispatch,
  useDateNightState,
} from '../../../hooks/useDateNightState'
import Timer from './Timer'
import { useDispatch, useGameState } from '../../../hooks/useGameState'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'
import { screenName } from '../../Menu'

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

// const dateAnimationVariants: Variants = {
//   initial: {
//     x: 1000,
//     opacity: 0,
//   },
//   enter: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       duration: 1.5,
//     },
//   },
//   exit: {
//     x: 1000,
//     opacity: 0,
//     transition: {
//       type: 'spring',
//       duration: 1.5,
//       delay: 0,
//     },
//   },
// }

export default function TableForTwo() {
  const discardCardDropTargetRef = useRef<HTMLDivElement>(null)
  const { difficulty } = useGameState()
  const dispatchGameAction = useDispatch()
  const { datePreferences, girlsAlreadySeen, datePhase } = useDateNightState()
  const unmountSignal = useUnmountedSignal('TableForTwo')
  const dispatchDateNightAction = useDateNightDispatch()

  const sceneLoadAnimationControls = useAnimationControls()

  React.useEffect(() => {
    if (unmountSignal.aborted) return
    switch (datePhase) {
      case 'SETTING_UP': {
        dispatchDateNightAction('datenight.startDate')
        break
      }
      case 'FINISHED': {
        dispatchGameAction({ type: 'game.nextScreen', value: screenName })
        break
      }
    }
  }, [
    datePhase,
    dispatchDateNightAction,
    dispatchGameAction,
    unmountSignal.aborted,
  ])

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
            {difficulty && datePreferences && (
              <YourDate
                difficulty={difficulty}
                datePreferences={datePreferences}
                girlsAlreadySeen={girlsAlreadySeen}
                datePhase={datePhase}
              />
            )}
          </AnimatePresence>
        </People>
        <Table ref={discardCardDropTargetRef} />
      </Scene>

      <CardArea>
        <PlayersCards
          discardTarget={discardCardDropTargetRef}
          animate={sceneLoadAnimationControls}
        />
      </CardArea>
    </>
  )
}
