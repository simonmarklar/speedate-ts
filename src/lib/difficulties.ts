import { difficulties } from '../config'
import { assertExists } from './types/assertions'

export function getDifficulty(name: GameDifficultyName): Difficulty {
  const difficulty = difficulties.find((d) => d.name === name)
  assertExists(difficulty, `Difficulty "${name}" not found`)

  return difficulty
}
