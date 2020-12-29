import deckOfCards from './config/cards.json'
import cardCategories from './config/categories.json'
import gameDifficulties from './config/difficulties.json'

export type Card = typeof deckOfCards[number]
export type Category = typeof cardCategories[number]
export type Difficulty = typeof gameDifficulties[number] 

const difficultyNames = [ ...gameDifficulties.map(d => d.name)] as const
export type DifficultyId = typeof difficultyNames[number]

const config = {
  deckOfCards,
  cardCategories,
  gameDifficulties,
  cardsPerHand: 5
}

export default config