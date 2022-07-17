import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import styled from 'styled-components'

import Girl from '../../../characters/girls'
import {
  Feelings,
  feelings,
  talk,
} from '../../../characters/girls/speech-templates'
import { useDateNightState } from '../../../hooks/useDateNightState'
import { useGameState } from '../../../hooks/useGameState'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'
import makeRandomSelectIterator from '../../../lib/random-select'
import tick from '../../../lib/tick'
import SpeechBubble from './SpeechBubble'
import { timeBetweenThoughts } from '../../../config'

const DateContainer = motion(styled.div`
  height: 100%;
  display: flex;
  position: relative;
`)
DateContainer.displayName = 'DateContainer'

// const girlImgRef = React.createRef<HTMLImageElement>()

export default function YourDate() {
  const unmountSignal = useUnmountedSignal()
  const imgRef = React.useRef<HTMLImageElement>(null)
  const { difficulty } = useGameState()
  const { datePreferences, girlsAlreadySeen, datePhase } = useDateNightState()
  const { likedCategories, dislikedCategories, lovedCards, hatedCards } =
    datePreferences ?? {}

  const cardTypeSelectors = useMemo(() => {
    console.log('updating dates preference selectors')
    const selectors = {
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
      likes: makeRandomSelectIterator(likedCategories || []),
      dislike: makeRandomSelectIterator(dislikedCategories || []),
      love: makeRandomSelectIterator(lovedCards || []),
      hate: makeRandomSelectIterator(hatedCards || []),
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
    let done = false
    const go = async () => {
      if (unmountSignal.aborted || datePhase !== 'ACTIVE') return

      try {
        await tick(timeBetweenThoughts)
        if (!unmountSignal.aborted) {
          if (wordsToSay) {
            setWordsToSay(undefined)
          } else {
            const cardType = cardTypeSelectors.feelings.next().value
            const card = cardTypeSelectors[cardType]?.next().value

            let subject = ''
            if (card) {
              subject = typeof card === 'string' ? card : card.name
            }

            setWordsToSay(talk(subject, cardType))
          }
        }
      } catch (e) {
        setWordsToSay(undefined)
        console.error(e)
      }
    }

    if (datePhase === 'ACTIVE' && !done) {
      done = true
      go()
    }
  }, [cardTypeSelectors, datePhase, unmountSignal.aborted, wordsToSay])

  const imgId = useMemo(
    () => girlsAlreadySeen[girlsAlreadySeen.length - 1],
    [girlsAlreadySeen],
  )

  return (
    <DateContainer>
      {wordsToSay && <SpeechBubble imgRef={imgRef}>{wordsToSay}</SpeechBubble>}
      <Girl dateNumber={imgId} ref={imgRef} />
    </DateContainer>
  )
}

// export default motion(YourDate)
