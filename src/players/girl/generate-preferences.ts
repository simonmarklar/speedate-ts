import _ from "lodash";

import { Difficulty } from "../../config/difficulties";
import { Card } from "../../config/cards";

export default function generateGirlsPreferences({
  gameParams,
  cards,
  categories
}: {
  gameParams: Difficulty["gameParams"];
  cards: Card[];
  categories: string[];
}) {
  const availableCategories = _.chain(categories)
    .shuffle()
    .take(gameParams.categories)
    .value();

  const likedCategories = _.chain(availableCategories)
    .shuffle()
    .take(gameParams.likes)
    .value();

  const loves = _.chain(cards)
    .filter(card => !!_.intersection(card.categories, likedCategories).length)
    .reduce((m, c) => [c.name, ...m], [] as string[])
    .take(gameParams.loves)
    .value();

  const hates = _.chain(cards)
    .filter(card => !!_.intersection(card.categories, likedCategories).length)
    .reduce((m, c) => [c.name, ...m], [] as string[])
    .take(gameParams.hates)
    .value();
  console.log(
    `girl prefs: ${JSON.stringify({ likedCategories, loves, hates })}`
  );
  return {
    likedCategories,
    loves,
    hates
  };
}
