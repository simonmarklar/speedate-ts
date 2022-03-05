import { assert } from '../lib/types/assertions'
import generateDatePreferences from './lib/generate-date-preferences'
import { cards, PLAYER_MAX_CARDS } from '../config'
import { cardIsInCategory, takeCards } from './lib/cards-categories'

export type DateNightAction =
  | ActionWithNoValue<'datenight.next'>
  | ActionWithNoValue<'player.getCards'>
  | ActionWithValue<'player.dragCard', { card: Card }>
  | ActionWithValue<'player.pickupCard', { card: Card | undefined }>
  | ActionWithValue<'player.dropCard', { card: Card; isDiscarding: boolean }>

export const init = (difficulty: Difficulty): DateNightState => {
  const datePreferences = generateDatePreferences({
    difficulty: difficulty,
  })

  return {
    dateNumber: 1,
    timeLeft: difficulty.gameParams.timeLimit,
    datePreferences,
    dealersCards:
      difficulty.name === 'EASY'
        ? cards.filter(cardIsInCategory(datePreferences.likedCategories))
        : cards,
    playersCards: [],
  }
}

export const createReducer = (difficulty: Difficulty) =>
  function globalStateReducer(
    currentState: DateNightState,
    action: DateNightAction,
  ): DateNightState {
    if (!action.type) return currentState
    console.log(action.type)

    switch (action.type) {
      case 'datenight.next': {
        assert(currentState, 'dateNightState should exist')
        assert(difficulty, 'difficulty should exist')

        const datePreferences = generateDatePreferences({
          difficulty: difficulty,
        })

        return {
          ...currentState,
          dateNumber: currentState.dateNumber++,
          timeLeft: difficulty.gameParams.timeLimit,
          datePreferences,
          dealersCards:
            difficulty.name === 'EASY'
              ? cards.filter(cardIsInCategory(datePreferences.likedCategories))
              : cards,
        }
      }
      case 'player.getCards': {
        assert(currentState, 'dateNightState should exist')
        const cardsLeft = currentState.dealersCards.length

        if (cardsLeft === 0) {
          console.log('### dealer out of cards')
          return currentState
        }

        const newCards = takeCards(
          currentState.dealersCards || [],
          Math.min(
            PLAYER_MAX_CARDS - currentState.playersCards.length,
            cardsLeft,
          ),
        )

        return {
          ...currentState,
          dealersCards: currentState.dealersCards?.filter(
            (c) => newCards.indexOf(c) === -1,
          ),
          playersCards: newCards.length
            ? (currentState.playersCards || []).concat(newCards)
            : currentState.playersCards,
        }
      }
      case 'player.pickupCard': {
        assert(currentState, 'dateNightState should exist')
        const { card } = action.value

        return {
          ...currentState,
          selectedCard: card,
        }
      }
      case 'player.dropCard': {
        assert(currentState, 'dateNightState should exist')
        const { card, isDiscarding } = action.value

        const playersCards = isDiscarding
          ? currentState.playersCards?.filter((c) => c.name !== card.name)
          : currentState.playersCards

        return { ...currentState, playersCards, selectedCard: undefined }
      }
    }

    return currentState
  }
