import styled from 'styled-components'

import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion'
import React, { useEffect } from 'react'

import PlayersCard from '../../components/Card'
import {
  useDateNightDispatch,
  useDateNightState,
} from '../../hooks/useDateNightState'

interface Props {
  discardTarget: React.RefObject<HTMLDivElement>
}

const cardVariants: Variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  enter: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ease: 'anticipate',
      delay: index * 0.25,
    },
  }),
  dragging: {
    scale: 1.2,
    opacity: 0.8,
  },
  drop: {
    rotate: 360,
    scale: 0,
    transition: {
      scale: {
        type: 'tween',
        from: 1,
        to: 0,
        duration: 0.3,
      },
    },
  },
  exit: {
    y: 500,
    opacity: 0,
    transition: {
      ease: 'anticipate',
      duration: 1.25,
      staggerChildren: 0.4,
    },
  },
}

const CardHolder = motion(styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 2rem;
`)

export default function PlayersCards({ discardTarget }: Props) {
  const dispatchDateNightAction = useDateNightDispatch()
  const { playersCards, selectedCard } = useDateNightState()
  const handleDragOverTarget = React.useCallback(
    (point: PanInfo['point']) => {
      if (selectedCard) {
        dispatchDateNightAction({
          type: 'player.dropCard',
          value: {
            card: selectedCard,
            isDiscarding: point.y < Number(discardTarget.current?.offsetTop),
          },
        })
      }
    },
    [discardTarget, dispatchDateNightAction, selectedCard],
  )

  useEffect(() => {
    if (playersCards && playersCards.length < 5) {
      dispatchDateNightAction('player.getCards')
    }
  }, [dispatchDateNightAction, playersCards])

  return (
    <CardHolder
      inherit={false}
      initial={{ flexGrow: 0, display: 'block' }}
      animate={{
        flexGrow: 1,
        display: 'flex',
        transition: { when: 'beforeChildren' },
      }}
    >
      <AnimatePresence>
        {playersCards.map(function renderCard(card, index) {
          return (
            <PlayersCard
              card={card}
              custom={index}
              key={card.name}
              variants={cardVariants}
              initial="initial"
              animate="enter"
              whileDrag="dragging"
              exit={selectedCard?.name === card.name ? 'drop' : 'exit'}
              drag
              dragElastic={1}
              dragSnapToOrigin={selectedCard?.name === card.name}
              dragConstraints={
                selectedCard?.name === card.name ? discardTarget : undefined
              }
              dragMomentum={false}
              onDragStart={() => {
                dispatchDateNightAction({
                  type: 'player.pickupCard',
                  value: { card },
                })
              }}
              onDragEnd={(event, { point }) => handleDragOverTarget(point)}
              layoutId={selectedCard?.name === card.name ? 'drop' : undefined}
            />
          )
        })}
      </AnimatePresence>
    </CardHolder>
  )
}
