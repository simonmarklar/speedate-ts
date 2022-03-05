import { MouseEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'
import useRemoveComponentIfSafe from '../../hooks/useRemoveComponentIfSafe'

const DifficultyButton = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const DifficultyName = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 0;
`

const DifficultyDescription = styled(motion.p)`
  background: white;
  padding: 0 12.5%;
`

interface Props {
  difficultyName: GameDifficultyName
  description: string
  onClick: MouseEventHandler
}

const colours = { EASY: '#AA0000', MEDIUM: '#00AA00', HARD: '#0000AA' }
const backgroundHover: Variants = {
  change: (difficulty: GameDifficultyName) => ({
    backgroundColor: colours[difficulty],
  }),
}

export default function MenuButton({
  difficultyName,
  description,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  useRemoveComponentIfSafe()

  return (
    <DifficultyButton
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
      variants={backgroundHover}
      custom={difficultyName}
      whileHover="change"
    >
      <DifficultyName>{difficultyName}</DifficultyName>
      {children}
      <DifficultyDescription>{description}</DifficultyDescription>
    </DifficultyButton>
  )
}
