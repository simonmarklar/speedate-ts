import { GameState } from "./game-state";
import { shuffle, chain } from "lodash";

export default function dealCards(state: GameState) {
  const {
    difficulty,
    dealersCards,
    playersCards,
    girlPreferences: { likedCategories }
  } = state;
  const shuffledCards = shuffle(dealersCards);
  const numCards = 5 - playersCards.length;

  return chain(shuffledCards)
    .thru(cards =>
      difficulty.name.toLowerCase() === "easy"
        ? cards.filter(card =>
            card.categories.some(
              (cat: string) => likedCategories.indexOf(cat) > -1
            )
          )
        : cards
    )
    .take(numCards)
    .thru(cardsToDeal => {
      const extraCardsNeeded = 5 - (cardsToDeal.length + playersCards.length);
      if (extraCardsNeeded > 0) {
        return chain(shuffledCards)
          .difference(cardsToDeal)
          .take(extraCardsNeeded)
          .concat(cardsToDeal)
          .value();
      }

      return cardsToDeal;
    })
    .concat(playersCards)
    .value();
}
