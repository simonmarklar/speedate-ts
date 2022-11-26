import { motion, Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import styled from 'styled-components'

import Girl from '../../../characters/girls'
import {
  Feelings,
  feelings,
  talk,
} from '../../../characters/girls/speech-templates'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'
import { makeRandomSelectIterator } from '../../../lib/iterators'
import { timeIterator } from '../../../lib/time-passing'
import SpeechBubble from './SpeechBubble'
import { timeBetweenThoughts } from '../../../config'

const DateContainer = motion(styled.div`
  height: 100%;
  display: flex;
  position: relative;
`)
DateContainer.displayName = 'DateContainer'

const dateAnimationVariants: Variants = {
  initial: {
    x: 1000,
    opacity: 0,
    display: 'flex',
    flex: '1 1 auto',
  },
  enter: {
    x: -100,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.5,
    },
  },
  exit: {
    x: 1000,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 1.5,
      delay: 0,
    },
  },
}

interface YourDateProps {
  difficulty: Difficulty
  datePreferences: DatePreferences
  girlsAlreadySeen: number[]
  datePhase: DatePhase
}

export default function YourDate({
  difficulty,
  datePreferences,
  girlsAlreadySeen,
  datePhase,
}: YourDateProps) {
  const isUnmounted = useUnmountedSignal('YourDate')
  const imgRef = React.useRef<HTMLImageElement>(null)
  // const { difficulty } = useGameState()
  // const { datePreferences, girlsAlreadySeen, datePhase } = useDateNightState()
  const { likedCategories, dislikedCategories, lovedCards, hatedCards } =
    datePreferences ?? {}

  const cardTypeSelectors = useMemo(() => {
    const selectors = {
      likes: makeRandomSelectIterator(likedCategories || []),
      dislike: makeRandomSelectIterator(dislikedCategories || []),
      love: makeRandomSelectIterator(lovedCards || []),
      hate: makeRandomSelectIterator(hatedCards || []),
      chitchat: makeRandomSelectIterator([]),
      feelings: makeRandomSelectIterator(
        feelings.reduce((memo, feeling) => {
          switch (feeling) {
            case 'hate':
              if (!hatedCards || hatedCards.length === 0) {
                return memo
              }
              break
            case 'dislike':
              if (!dislikedCategories || dislikedCategories.length === 0) {
                return memo
              }
              break
            default:
              memo.push(feeling)
          }

          return memo
        }, [] as Feelings[]),
      ),
    }
    if (difficulty?.gameParams.numberOfHates) {
      return {
        ...selectors,
        hate: makeRandomSelectIterator(hatedCards || []),
      }
    }

    return selectors
  }, [
    difficulty?.gameParams.numberOfHates,
    dislikedCategories,
    hatedCards,
    likedCategories,
    lovedCards,
  ])

  const [wordsToSay, setWordsToSay] = useState<string>()

  useEffect(() => {
    const go = async () => {
      if (isUnmounted.aborted) return

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _tick of timeIterator({
        lengthInMs: timeBetweenThoughts,
        abortSignal: isUnmounted,
      })) {
        if (isUnmounted.aborted) {
          setWordsToSay((_state) => undefined)
          break
        }

        setWordsToSay((wordsToSay) => {
          if (wordsToSay) {
            return undefined
          } else {
            const cardType = cardTypeSelectors.feelings.next().value
            const card = cardTypeSelectors[cardType]?.next().value

            let subject = ''
            if (card) {
              subject = typeof card === 'string' ? card : card.name
            }

            return talk(subject, cardType)
          }
        })
      }
    }

    if (datePhase === 'ACTIVE') {
      console.log('triggering speech loop')
      try {
        go()
      } catch (e) {
        console.error(e)
      }
    }
  }, [cardTypeSelectors, datePhase, isUnmounted])

  const imgId = useMemo(
    () => girlsAlreadySeen[girlsAlreadySeen.length - 1],
    [girlsAlreadySeen],
  )

  return (
    <DateContainer>
      {wordsToSay && <SpeechBubble imgRef={imgRef}>{wordsToSay}</SpeechBubble>}
      <motion.div
        variants={dateAnimationVariants}
        initial="initial"
        exit="exit"
        animate="enter"
      >
        <Girl dateNumber={imgId} ref={imgRef} />
      </motion.div>
    </DateContainer>
  )
}
