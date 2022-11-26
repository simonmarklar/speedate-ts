import styled from 'styled-components'

import {
  AnimatePresence,
  AnimationControls,
  motion,
  Variants,
} from 'framer-motion'
import React, { useEffect } from 'react'

import PlayersCard from '../../../components/Card/Card'

import {
  useDateNightDispatch,
  useDateNightState,
} from '../../../hooks/useDateNightState'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'

const cardAnimations: Variants = {
  initial: {
    y: 200,
    opacity: 0,
  },
  disabled: (index: number) => ({
    y: 0,
    rotate: 360,
    transition: {
      type: 'spring',
      duration: 0.75,
      delay: index * 0.15,
    },
  }),
  enter: (index: number) => {
    return {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        delay: index * 0.15,
        duration: 0.25,
      },
    }
  },
  dragging: {
    scale: 1.2,
    opacity: 0.8,
    zIndex: 10,
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
    },
  },
}

const CardHolder = motion(styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`)
CardHolder.displayName = 'CardHolder'

interface Props {
  discardTarget: React.RefObject<HTMLDivElement>
  animate: AnimationControls
}

export default function PlayersCards({ discardTarget, animate }: Props) {
  const dispatchDateNightAction = useDateNightDispatch()
  const { playersCards, selectedCard, datePhase } = useDateNightState()
  const unmountSignal = useUnmountedSignal('PlayersCards')

  useEffect(() => {
    if (playersCards && playersCards.length < 5 && !unmountSignal.aborted) {
      dispatchDateNightAction('player.getCards')
    }
  }, [dispatchDateNightAction, playersCards, unmountSignal.aborted])

  return (
    <CardHolder inherit={false}>
      <AnimatePresence initial={true}>
        {playersCards.map(function renderCard(card, index) {
          return (
            <PlayersCard
              card={card}
              isFaceDown={datePhase === 'FINISHED'}
              key={card.name}
              custom={index}
              variants={cardAnimations}
              initial="initial"
              animate="enter"
              exit={selectedCard?.name === card.name ? 'drop' : 'exit'}
              whileDrag="dragging"
              drag={datePhase === 'ACTIVE'}
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
              onDragEnd={(event, { point }) => {
                if (selectedCard) {
                  dispatchDateNightAction({
                    type: 'player.dropCard',
                    value: {
                      card: selectedCard,
                      isDiscarding:
                        point.y < Number(discardTarget.current?.offsetTop),
                    },
                  })
                }
              }}
              // onAnimationComplete={(variantName) => {
              //   if (
              //     variantName === 'enter' &&
              //     index >= playersCards.length - 1
              //   ) {
              //     console.log('all done - timer should not have started yet')
              //   }
              // }}
            />
          )
        })}
      </AnimatePresence>
    </CardHolder>
  )
}
