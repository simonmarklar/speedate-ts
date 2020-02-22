import { take, shuffle, chain, remove } from "lodash";

import { Difficulty } from "../../config/difficulties";
import { Card } from "../../config/cards";

const notInCategories = (categories: string[]) => (card: Card) =>
  card.categories.some(cat => categories.indexOf(cat) !== -1);

export default function generateGirlsPreferences({
  gameParams,
  cards,
  categories
}: {
  gameParams: Difficulty["gameParams"];
  cards: Card[];
  categories: string[];
}) {
  return chain(categories)
    .shuffle()
    .take(gameParams.categories)
    .shuffle()
    .take(gameParams.likes)
    .thru(likedCategories => {
      const unlikedCards = remove(
        shuffle(cards),
        notInCategories(likedCategories)
      );
      return {
        likedCategories,
        loves: take(unlikedCards, gameParams.loves),
        hates: take(unlikedCards, gameParams.hates)
      };
    })
    .value();
}
