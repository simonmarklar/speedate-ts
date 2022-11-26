import _ from 'lodash'

export function takeCards(cards: Card[], numToTake: number) {
  return _.chain(cards).shuffle().take(numToTake).value()
}

export function cardNotInCategory(blacklistedCategories: string[]) {
  return (card: Card): boolean =>
    card.categories.every(
      (category) => blacklistedCategories.indexOf(category) === -1,
    )
}

export function cardIsInCategory(categories: string[]) {
  return (card: Card) => !cardNotInCategory(categories)(card)
}

export function getUniqueCardCategories(cards: Card[]): string[] {
  return Array.from(
    cards.reduce<Set<string>>((memo, card) => {
      card.categories.forEach((category) => memo.add(category))
      return memo
    }, new Set<string>()),
  )
}

export function getLikedCategories(
  allCategories: string[],
  { numberOfCategories, numberOfLikes }: Difficulty['gameParams'],
) {
  return _.chain(allCategories)
    .shuffle()
    .take(numberOfCategories)
    .shuffle()
    .take(numberOfLikes)
    .value()
}
