// import { take, shuffle, chain, remove } from "lodash";

import { Difficulty } from "../../config/difficulties";
import { Card } from "../../config/cards";
import { chain, shuffle, take, all } from "./categories";

const excludeCardsInCategories = (categories: string[]) =>
  function* (cards: Card[]): Generator<Card, void, void> {
    for (const card of cards) {
      if (card.categories.some((cat) => categories.indexOf(cat) !== -1)) {
        yield card;
      }
    }
  };

const generateLikedCategories = (gameParams: Difficulty["gameParams"]) =>
  chain(shuffle, take(gameParams.categories), shuffle, take(gameParams.likes));

//   const allCategories = categoryIterators.shuffle(categories)
//   const categoriesForCurrentGame =  categoryIterators.take(gameParams.categories)(allCategories)
//   const likedCategories = categoryIterators.take(gameParams.likes)(categoryIterators.shuffle(categoriesForCurrentGame))

//   for (const category in likedCategories) {

//   }
// }

// export default function generateGirlsPreferences({
//   gameParams,
//   cards,
//   categories
// }: {
//   gameParams: Difficulty["gameParams"];
//   cards: Card[];
//   categories: string[];
// }) {
//   return chain(categories)
//     .shuffle()
//     .take(gameParams.categories)
//     .shuffle()
//     .take(gameParams.likes)
//     .thru(likedCategories => {
//       const unlikedCards = remove(
//         shuffle(cards),
//         notInCategories(likedCategories)
//       );
//       return {
//         likedCategories,
//         loves: take(unlikedCards, gameParams.loves),
//         hates: take(unlikedCards, gameParams.hates)
//       };
//     })
//     .value();
// }

function generateGirlsPreferences({
  gameParams,
  cards,
  categories,
}: {
  gameParams: Difficulty["gameParams"];
  cards: Card[];
  categories: string[];
}) {
  const likedCategories = generateLikedCategories(gameParams)(categories);
  chain(
    excludeCardsInCategories(likedCategories), 
    all(take(gameParams.loves), take(gameParams.hates))
  );
}
