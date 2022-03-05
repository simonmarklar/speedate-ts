import React, { useRef } from 'react'

import styled from 'styled-components'
import { motion } from 'framer-motion'

import tableImg from './table.png'
import background from './bg.jpg'

import Player from '../../characters/guys'
import Girl from '../../characters/girls'
import PlayersCards from './PlayersCards'
import {
  useGameState,
  useDispatch as useGameStateDispatch,
} from '../../hooks/useGameState'

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
      return (
        <TableContainer ref={ref} onDragOver={() => console.log('mouse enter')}>
          {children}
        </TableContainer>
      )
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

export default function TableForTwo() {
  const dispatchGameAction = useGameStateDispatch()
  const { difficulty } = useGameState()
  const discardCardDropTargetRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Scene>
        <People>
          <Player difficulty={difficulty?.name} />
          <Girl />
        </People>
        <Table ref={discardCardDropTargetRef} />
      </Scene>

      <PlayersCards discardTarget={discardCardDropTargetRef} />
      <button onClick={() => dispatchGameAction({ type: 'game.toMenu' })}>
        Menu
      </button>
    </>
  )
}
