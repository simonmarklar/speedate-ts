import { difficulties } from '../../config'
import { assert } from '../../lib/types/assertions'

export function getDifficulty(name: GameDifficultyName): Difficulty {
  const difficulty = difficulties.find((d) => d.name === name)
  assert(difficulty, 'Difficulty not found')

  return difficulty
}
