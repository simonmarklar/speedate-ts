import { motion, Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDateNightDispatch } from '../../../hooks/useDateNightState'

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

const tick = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })

const timerAnimations: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 1.25,
      staggerChildren: 0.4,
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

  useEffect(() => {
    const go = async () => {
      await tick()

      setTimeLeft((current) => {
        if (current !== undefined) {
          return Math.max(0, current - 1)
        } else {
          return Math.max(0, dateLength || 0)
        }
      })
    }

    if (!isOn || timeLeft === undefined) {
      return
    }

    if (timeLeft > 0) {
      go()
    } else if (timeLeft <= 0) {
      dispatch('datenight.endDate')
    }
  }, [dateLength, dispatch, isOn, timeLeft])

  const isInDangerMode = useMemo(() => (timeLeft ?? 0) < 10, [timeLeft])

  return (
    <Clock
      variants={timerAnimations}
      animate={isInDangerMode ? 'danger' : 'animate'}
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
