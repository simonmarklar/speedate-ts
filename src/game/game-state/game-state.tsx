import { useReducer, useContext, PropsWithChildren, Dispatch } from "react";
import useDifficulties, { Difficulty } from "../../config/difficulties";
import useCards, { Card } from "../../config/cards";
import React from "react";
import dealCards from "./deal-cards";
import generateGirlsPreferences from "./generate-preferences";

export interface GameState {
  difficulty: Difficulty;

  dealersCards: Card[];
  playersCards: Card[];
  timeLeft: number;
  girlPreferences: {
    likedCategories: string[];
    loves: Card[];
    hates: Card[];
  };
  dateNumber: number;
}

export interface GameAction {
  type: keyof Exclude<ReturnType<typeof gameActions>, GameState>;
}

interface GameStateContextType {
  gameState: Readonly<GameState>;
  actionDispatchers: Readonly<ReturnType<typeof gameActions>>;
}

type NewGameConfig = {
  dealersCards: Card[];
  playersCards: Card[];
  categories: Set<string>;
  difficulty: Difficulty;
};

const GameStateContext = React.createContext<Partial<GameStateContextType>>({});

function startNewGame({
  categories,
  dealersCards,
  playersCards,
  difficulty
}: NewGameConfig): GameState {
  const timeLeft = difficulty.gameParams.timeLimit;
  const girlPreferences = generateGirlsPreferences({
    gameParams: difficulty.gameParams,
    categories: Array.from(categories.values()),
    cards: dealersCards
  });

  return {
    difficulty,
    dealersCards,
    playersCards,
    timeLeft,
    girlPreferences,
    dateNumber: 0
  };
}

function gameActions(dispatch: Dispatch<GameAction>) {
  return {
    init: () => dispatch({ type: "init" }),
    deal: () => dispatch({ type: "deal" }),
    next: () => dispatch({ type: "next" })
  };
}
export function GameStateProvider({ children }: PropsWithChildren<{}>) {
  const { selectedDifficulty: difficulty } = useDifficulties();
  const { cards, categories } = useCards();

  const initState = () =>
    startNewGame({
      dealersCards: Array.from(cards.values()),
      playersCards: [],
      categories,
      difficulty
    });

  function reducer(state: Readonly<GameState>, action: Readonly<GameAction>) {
    switch (action.type) {
      case "init":
        return {
          ...state,
          ...initState()
        };
      case "deal":
        return {
          ...state,
          playersCards: dealCards(state)
        };
      case "next":
        return {
          ...state,
          dateNumber: state.dateNumber + 1
        };
      default:
        return state;
    }
  }

  const [gameState, dispatch] = useReducer(reducer, {}, initState);

  const actions = gameActions(dispatch);

  return (
    <GameStateContext.Provider
      value={{ gameState, actionDispatchers: actions }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export default function() {
  return useContext(GameStateContext) as GameStateContextType;
}
