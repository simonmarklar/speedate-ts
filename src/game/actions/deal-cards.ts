import { GameState } from "../game-settings";
import { Card } from "../../config/cards";
import _ from "lodash";
export function dealCards(state: GameState) {
  const {
    difficulty,
    cards,
    dealersCards,
    playersCards,
    girlPreferences: { likedCategories }
  } = state;
  const shuffledCards = _.shuffle(dealersCards);
  const numCards = 5 - playersCards.length;

  // debugger;
  let cardsToDeal =
    difficulty.name !== "Easy"
      ? _.take(shuffledCards, numCards)
      : _.chain(shuffledCards)
          .filter(
            cardId =>
              !!_.intersection(
                (cards.get(cardId) as Card).categories,
                likedCategories
              ).length
          )
          .take(numCards)
          .value();

  const extraCardsNeeded = 5 - (cardsToDeal.length + playersCards.length);
  if (extraCardsNeeded > 0) {
    const extra = _.chain(shuffledCards)
      .difference(cardsToDeal)
      .take(extraCardsNeeded)
      .value();

    cardsToDeal = cardsToDeal.concat(extra);
  }

  return cardsToDeal;
}
