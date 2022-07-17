import _ from 'lodash'

export function takeCards(cards: Card[], numToTake: number) {
  return _.chain(cards).shuffle().take(numToTake).value()
}

export const cardNotInCategory =
  (blacklistedCategories: string[]) =>
  (card: Card): boolean =>
    card.categories.every(
      (category) => blacklistedCategories.indexOf(category) === -1,
    )

export const cardIsInCategory = (categories: string[]) => (card: Card) =>
  !cardNotInCategory(categories)(card)

export const getUniqueCardCategories = (cards: Card[]): string[] =>
  Array.from(
    cards.reduce<Set<string>>((memo, card) => {
      card.categories.forEach((category) => memo.add(category))
      return memo
    }, new Set<string>()),
  )

export function getLikedCategories(
  allCategories: string[],
  {
    numberOfCategories: categories,
    numberOfLikes: likes,
  }: Difficulty['gameParams'],
) {
  const likedCategories = _.chain(allCategories)
    .shuffle()
    .take(categories)
    .shuffle()
    .take(likes)
    .value()

  console.log({ likedCategories })

  return likedCategories
}
