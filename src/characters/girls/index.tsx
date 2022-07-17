import * as React from 'react'
import styled from 'styled-components'

import girl0 from './girl0.png'
import girl1 from './girl1.png'
import girl2 from './girl2.png'
import girl3 from './girl3.png'
import girl4 from './girl4.png'
import girl5 from './girl5.png'
import girl6 from './girl6.png'
import girl7 from './girl7.png'
import girl8 from './girl8.png'
import girl9 from './girl9.png'

const images = [
  girl0,
  girl1,
  girl2,
  girl3,
  girl4,
  girl5,
  girl6,
  girl7,
  girl8,
  girl9,
]

// const Container = styled.div`
//   flex: 1 1 auto;
//   display: flex;
//   justify-content: flex-end;
// `

const GirlImage = styled.img`
  flex: 0 0 auto;
`

interface Props {
  dateNumber: number
}

export default React.forwardRef<HTMLImageElement, Props>(function Girl(
  { dateNumber },
  ref,
) {
  return <GirlImage src={images[dateNumber]} alt="Your Date" ref={ref} />
})
