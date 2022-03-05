import styled from 'styled-components'
import easySprite from './guy0.png'
import mediumSprite from './guy1.png'
import hardSprite from './guy2.png'

interface Props {
  difficulty?: GameDifficultyName
}

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`

const Image = ({ difficulty }: Props) => {
  switch (difficulty) {
    case 'MEDIUM':
      return <img src={mediumSprite} alt="You" />
    case 'HARD':
      return <img src={hardSprite} alt="You" />
    default:
      return <img src={easySprite} alt="You" />
  }
}

export default function Player(props: Props) {
  return (
    <Container>
      <Image {...props} />
    </Container>
  )
}
