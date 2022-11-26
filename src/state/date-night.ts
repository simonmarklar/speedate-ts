import { assertExists } from '../lib/types/assertions'
import generateDatePreferences from '../lib/generate-date-preferences'
import { cards, PLAYER_MAX_CARDS, MAX_DATE_IMAGES } from '../config'
import { cardIsInCategory, takeCards } from '../lib/cards-categories'
import { makeRandomPlucker } from '../lib/iterators'
import { sequence } from '../lib/array-utils'

export type DateNightAction =
  | ActionWithNoValue<'datenight.next'>
  | ActionWithNoValue<'datenight.startDate'>
  | ActionWithNoValue<'datenight.endDate'>
  | ActionWithNoValue<'player.getCards'>
  | Action<'player.dragCard', { card: Card }>
  | Action<'player.pickupCard', { card?: Card }>
  | Action<'player.dropCard', { card: Card; isDiscarding: boolean }>

export const init = (difficulty: Difficulty): DateNightState => {
  const datePreferences = generateDatePreferences({
    difficulty: difficulty,
  })

  return {
    datePhase: 'SETTING_UP',
    dateNumber: 1,
    datePreferences,
    dealersCards:
      difficulty.name === 'EASY'
        ? cards.filter(cardIsInCategory(datePreferences.likedCategories))
        : cards,
    playersCards: [],
    girlsAlreadySeen: [],
  }
}

export const createReducer = (difficulty: Difficulty) => {
  const dateImages = makeRandomPlucker(sequence(MAX_DATE_IMAGES - 1))

  return function globalStateReducer(
    currentState: DateNightState,
    action: DateNightAction,
  ): DateNightState {
    if (!action.type) return currentState
    console.log('date night state update: ', action)

    switch (action.type) {
      case 'datenight.next': {
        assertExists(currentState, 'dateNightState should exist')
        assertExists(difficulty, 'difficulty should exist')

        const dateImage = dateImages.next().value
        const datePreferences = generateDatePreferences({
          difficulty: difficulty,
        })

        return {
          ...currentState,
          datePhase: 'SETTING_UP',
          dateNumber: currentState.dateNumber++,
          datePreferences,
          playersCards: [],
          dealersCards:
            difficulty.name === 'EASY'
              ? cards.filter(cardIsInCategory(datePreferences.likedCategories))
              : cards,
          girlsAlreadySeen: dateImage.value
            ? currentState.girlsAlreadySeen.concat([dateImage.value])
            : currentState.girlsAlreadySeen,
        }
      }

      case 'datenight.startDate': {
        const dateImage = dateImages.next()

        return {
          ...currentState,
          datePhase: 'ACTIVE',
          girlsAlreadySeen:
            typeof dateImage.value === 'number'
              ? currentState.girlsAlreadySeen.concat([dateImage.value])
              : currentState.girlsAlreadySeen,
        }
      }

      case 'datenight.endDate': {
        return {
          ...currentState,
          datePhase: 'FINISHED',
          datePreferences: undefined,
        }
      }

      case 'player.getCards': {
        assertExists(currentState, 'dateNightState should exist')
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
        assertExists(currentState, 'dateNightState should exist')
        assertExists(action.value, 'picked up card missing')
        const { card } = action.value

        return {
          ...currentState,
          selectedCard: card,
        }
      }

      case 'player.dropCard': {
        assertExists(currentState, 'dateNightState should exist')
        assertExists(action.value, 'picked up card missing')
        const { card, isDiscarding } = action.value

        const playersCards = isDiscarding
          ? currentState.playersCards?.filter((c) => c.name !== card.name)
          : currentState.playersCards

        return { ...currentState, playersCards, selectedCard: undefined }
      }
    }

    return currentState
  }
}
