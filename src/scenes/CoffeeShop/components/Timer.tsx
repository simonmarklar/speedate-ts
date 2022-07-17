import { motion, Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDateNightDispatch } from '../../../hooks/useDateNightState'
import useUnmountedSignal from '../../../hooks/useUnmountedSignal'
import tick from '../../../lib/tick'

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
        bounce: 0.6,
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
  const unmountSignal = useUnmountedSignal()

  useEffect(() => {
    if (unmountSignal.aborted || !isOn) return
    const go = async () => {
      try {
        await tick(1000, unmountSignal)
        if (!unmountSignal.aborted) {
          setTimeLeft((current) => {
            if (current !== undefined) {
              return Math.max(0, current - 1)
            } else {
              return Math.max(0, dateLength || 0)
            }
          })
        }
      } catch (e) {
        console.log('unmount signal fired: ', e)
      }
    }

    if (timeLeft === undefined) {
      return
    }

    if (timeLeft > 0) {
      go()
    } else if (timeLeft <= 0) {
      dispatch('datenight.endDate')
    }
  }, [
    dateLength,
    dispatch,
    isOn,
    timeLeft,
    unmountSignal,
    unmountSignal.aborted,
  ])

  const isInDangerMode = useMemo(
    () => isOn && (timeLeft ?? 0) < 10,
    [isOn, timeLeft],
  )

  return (
    <Clock
      variants={timerAnimations}
      animate={!isOn ? 'initial' : isInDangerMode ? 'danger' : 'animate'}
      initial="initial"
      exit="exit"
    >
      <Digit dangerMode={isInDangerMode}>
        {timeLeft?.toString().padStart(2, '0').split('')[0]}
      </Digit>
      <Digit dangerMode={isInDangerMode}>
        {timeLeft?.toString().padStart(2, '0').split('')[1]}
      </Digit>
    </Clock>
  )
}
