import React, { useRef } from 'react'

import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import tableImg from './table.png'
import background from './bg.jpg'
import cardAreaBg from './green-felt.jpg'

import Player from '../../../characters/guys'
import Girl from '../../../characters/girls'
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
  background: url(${background}) repeat-x center top;
  background-size: contain;
`
Scene.displayName = 'Scene'

const People = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  flex-direction: row;
`

const CardArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1rem 2rem;
  background: url(${cardAreaBg}) center center;
  background-size: contain;
  height: 20vh;
`
CardArea.displayName = 'CardArea'

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
          <Girl />
        </People>
        <Table ref={discardCardDropTargetRef} />
      </Scene>

      <CardArea>
        <PlayersCards discardTarget={discardCardDropTargetRef} />
      </CardArea>
    </>
  )
}
