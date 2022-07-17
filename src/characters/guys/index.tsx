import styled from 'styled-components'
import easySprite from './guy0.png'
import mediumSprite from './guy1.png'
import hardSprite from './guy2.png'

interface Props {
  spriteId?: GameDifficultyName
}

const GuyImage = styled.img``

const Image = ({ spriteId }: Props) => {
  switch (spriteId) {
    case 'MEDIUM':
      return <GuyImage src={mediumSprite} alt="You" />
    case 'HARD':
      return <GuyImage src={hardSprite} alt="You" />
    default:
      return <GuyImage src={easySprite} alt="You" />
  }
}

export default function Player({ spriteId }: Props) {
  return <Image spriteId={spriteId} />
}
