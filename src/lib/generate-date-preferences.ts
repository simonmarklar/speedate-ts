import { categories, cards } from '../config'

import {
  takeCards,
  getLikedCategories,
  cardNotInCategory,
  getUniqueCardCategories,
} from './cards-categories'

export default function generateDatePreferences({
  difficulty,
}: {
  difficulty: Difficulty
}): DatePreferences {
  const likedCategories = getLikedCategories(categories, difficulty.gameParams)
  const isUnliked = cardNotInCategory(likedCategories)
  const unlikedCards = cards.filter(isUnliked)

  const lovedCards = takeCards(
    unlikedCards,
    difficulty.gameParams.numberOfLoves,
  )
  const lovedCategories = getUniqueCardCategories(lovedCards)
  const notLoved = cardNotInCategory(likedCategories.concat(lovedCategories))

  const hatedCards = takeCards(
    unlikedCards.filter(notLoved),
    difficulty.gameParams.numberOfHates,
  )

  return {
    likedCategories,
    lovedCards,
    hatedCards,
  }
}
