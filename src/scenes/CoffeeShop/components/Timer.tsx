import { motion, Variants } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDateNightDispatch } from '../../../hooks/useDateNightState'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'
import timePassing, { timeIterator } from '../../../lib/time-passing'

const Digit = styled.div<{ dangerMode: boolean }>`
  background: #000;
  color: ${({ dangerMode }) => (dangerMode ? '#ff0000' : '#3db341')};
  border: 2px solid #5a1b1b94;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`
Digit.displayName = 'Digit'

const Clock = styled(motion.div)`
  display: flex;
  width: 5rem;
  height: 5rem;
  position: absolute;
  top: 1.5rem;
  left: 3rem;
`
Clock.displayName = 'Clock'

interface ClockProps {
  timeLeft?: number
  isInDangerMode: boolean
}
function Digits({ timeLeft, isInDangerMode }: ClockProps) {
  const digits = (timeLeft ?? 0).toString().padStart(2, '0').split('')
  return (
    <>
      {digits.map((digit, index) => {
        return (
          <Digit dangerMode={isInDangerMode} key={index}>
            {digit}
          </Digit>
        )
      })}
    </>
  )
}

interface Props {
  dateLength?: number
  isOn?: boolean
}

const timerAnimations: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotateZ: 0,
    transition: {
      ease: 'easeIn',
      duration: 1.25,
      delay: 0,
    },
  },
  danger: {
    scale: 1.1,
    opacity: 1,
    rotateZ: [340, 20, 220, 60, 0],
    transition: {
      rotateZ: {
        type: 'spring',
        duration: 0.2,
        repeat: 9,
        repeatType: 'mirror',
        repeatDelay: 0.8,
      },
      scale: {
        type: 'spring',
        from: 1.12,
        to: 0.7,
        bounce: 0.9,
        duration: 1,
        repeat: 9,
        repeatType: 'mirror',
      },
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 1.25,
      staggerChildren: 0.4,
    },
  },
}

export default function Timer({ dateLength, isOn = false }: Props) {
  const [timeLeft, setTimeLeft] = useState(dateLength)
  const dispatch = useDateNightDispatch()
  const isUnmounted = useUnmountedSignal('Timer')

  useEffect(() => {
    const startClock = async () => {
      if (isUnmounted.aborted || dateLength === undefined) {
        return
      }

      await timePassing(2000, isUnmounted)

      for await (const tick of timeIterator({
        lengthInMs: 1000,
        abortSignal: isUnmounted,
        maxRunTimeMs: (dateLength ?? 0) * 1000,
        iterId: 'clock',
      })) {
        if (isUnmounted.aborted) {
          break
        }

        setTimeLeft(dateLength - tick)
      }

      await timePassing(1500)
      dispatch('datenight.endDate')
    }

    if (timeLeft === dateLength) {
      try {
        startClock()
      } catch (e) {
        console.error(e)
      }
    }
  }, [dateLength, dispatch, isOn, timeLeft])

  const isInDangerMode = (timeLeft ?? 0) < 10

  return (
    <>
      <Clock
        variants={timerAnimations}
        animate={timeLeft === undefined ? 'initial' : isInDangerMode ? 'danger' : 'animate'}
        initial="initial"
        exit="exit"
      >
        <Digits isInDangerMode={isInDangerMode} timeLeft={timeLeft} />
      </Clock>
    </>
  )
}
