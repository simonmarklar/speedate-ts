import cardImage from './card.png'
import cardBackImage from './card-back-small.png'
import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'
import React from 'react'

const CardText = styled.div`
  flex: 1 1 auto;
  text-align: center;
`
CardText.displayName = 'CardText'

const flip: Variants = {
  initial: (isFaceDown: boolean) => {
    return {
      backgroundImage: `url(${cardImage})`,
      rotateY: isFaceDown ? 180 : 0,
      transition: {
        ease: 'linear',
        duration: 0.5,
      },
    }
  },
  animate: (isFaceDown: boolean) => {
    return {
      zIndex: isFaceDown ? 1 : 2,
      rotateY: isFaceDown ? 180 : 0,
      x: isFaceDown ? '-100%' : 0,
      backgroundImage: isFaceDown
        ? `url(${cardBackImage})`
        : `url(${cardImage})`,
      transition: {
        ease: 'easeOut',
        duration: 0.25,
        backgroundImage: {
          delay: 0.125,
        },
      },
    }
  },
}

const CardFace = styled(motion.div)<{ isFaceDown?: boolean }>`
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-position-x: center;
  background-position-y: center;
  transform-origin: right center;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  display: flex;
  flex: 1 0 auto;
  min-width: 120px;
  max-width: 120px;
  height: 100%;
  padding: 0 1rem;
  background-size: contain;
  align-items: center;
  justify-items: center;
  user-select: none;
  overflow-wrap: anywhere;
  text-align: center;
`

const CardContainer = styled(motion.div)`
  transform-style: preserve-3d;
  perspective: 1000px;
`

const Card = motion(
  React.forwardRef(
    (
      { card, isFaceDown = false }: { card: Card; isFaceDown?: boolean },
      ref: React.Ref<HTMLDivElement> | undefined,
    ) => {
      return (
        <CardContainer ref={ref}>
          <CardFace
            variants={flip}
            isFaceDown={isFaceDown}
            initial="initital"
            animate="animate"
            custom={isFaceDown}
          >
            {!isFaceDown && <CardText>{card.name}</CardText>}
          </CardFace>
        </CardContainer>
      )
    },
  ),
)

export default Card
