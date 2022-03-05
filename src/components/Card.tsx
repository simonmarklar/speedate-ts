import cardImage from './card.png'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import React from 'react'

const GameCard = styled(motion.div)`
  background: url(${cardImage}) no-repeat center center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  display: flex;
  flex: 1 1 auto;
  max-width: 170px;
  background-size: contain;
  align-items: center;
  justify-items: center;
  user-select: none;
`
GameCard.displayName = 'GameCard'

const CardText = styled.div`
  flex: 1 1 auto;
  text-align: center;
`
CardText.displayName = 'CardText'

const Card = motion(
  React.forwardRef(
    ({ card }: { card: Card }, ref: React.Ref<HTMLDivElement> | undefined) => {
      return (
        <GameCard ref={ref}>
          <CardText>{card.name}</CardText>
        </GameCard>
      )
    },
  ),
)

export default Card
