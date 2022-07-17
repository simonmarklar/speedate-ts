import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { spriteLayers } from '../../../config'

const bubbleRef = React.createRef<HTMLDivElement>()

const SpeechBubbleText = styled(motion.div)`
  padding: 0.9rem;
  margin: 0.45rem;
  zindex: ${spriteLayers.FOREGROUND};
`
SpeechBubble.displayName = 'SpeechBubble'

const Pointer = styled.div`
  position: absolute;
  top: -4px;
  right: -23px;
  width: 24px;
  height: 23px;
  background-color: white;
  border-radius: 0 100% 1% 0;
  border-top: 4px solid black;
  border-right: 4px solid black;
  border-bottom: 4px solid black;
  zindex: ${spriteLayers.FOREGROUND};
`

const SpeechWrapper = motion(styled.div<{ $y: number }>`
  position: absolute;
  transform-origin: center center;
  transform: translateX(-60%) translateY(-100%);
  left: 0px;
  top: ${({ $y }) => `${$y}px`};
  max-width: 20rem;
  background-color: white;
  border: 4px solid black;
  border-radius: 10% 0 10% 10%;
  zindex: ${spriteLayers.FOCUS};
`)

export default function SpeechBubble({
  imgRef,
  children,
}: {
  imgRef: React.RefObject<HTMLImageElement>
  children: React.ReactNode
}) {
  const [speechBubbleY, setSpeechBubbleY] = React.useState<number>()
  React.useEffect(() => {
    if (imgRef.current) {
      const bounds = imgRef.current.getBoundingClientRect()
      const y = bounds.height / 3
      setSpeechBubbleY(y)
    }
  }, [imgRef])

  if (!speechBubbleY) return null

  return (
    <>
      <AnimatePresence>
        <SpeechWrapper
          $y={speechBubbleY}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SpeechBubbleText ref={bubbleRef}>{children}</SpeechBubbleText>
          <Pointer />
        </SpeechWrapper>
      </AnimatePresence>
    </>
  )
}
