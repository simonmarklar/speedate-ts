import styled from 'styled-components'
import girl0 from './girl0.png'
// import girl1 from './girl1.png'
// import girl2 from './girl2.png'
// import girl3 from './girl3.png'
// import girl4 from './girl4.png'
// import girl5 from './girl5.png'
// import girl6 from './girl6.png'
// import girl7 from './girl7.png'
// import girl8 from './girl8.png'
// import girl9 from './girl9.png'

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
`

export default function Girl() {
  return (
    <Container>
      <img src={girl0} alt="Your Date" />
    </Container>
  )
}
