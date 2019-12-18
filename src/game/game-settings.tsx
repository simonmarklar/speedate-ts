import { useReducer, useContext, PropsWithChildren, Dispatch } from "react";
import useDifficulties, { Difficulty } from "../config/difficulties";
import useCards, { CardMap } from "../config/cards";
import React from "react";
import { dealCards } from "./actions/deal-cards";
import generateGirlsPreferences from "../players/girl/generate-preferences";

export type BaseData = {
  difficulty: Difficulty;
  cards: CardMap;
  categories: Set<string>;
};

export type GameState = BaseData & {
  dealersCards: string[];
  playersCards: string[];
  timeLeft: number;
  girlPreferences: {
    likedCategories: string[];
    loves: string[];
    hates: string[];
  };
  dateNumber: number;
};

export interface GameAction {
  type: keyof Exclude<ReturnType<typeof gameActions>, GameState>;
}

interface GameStateContextType {
  gameState: Readonly<GameState>;
  gameActions: Readonly<ReturnType<typeof gameActions>>;
}

const GameStateContext = React.createContext<Partial<GameStateContextType>>({});

function startNewGame(
  cards: CardMap,
  categories: Set<string>,
  difficulty: Difficulty
) {
  const dealersCards = Array.from(cards.keys());
  const playersCards = [] as string[];
  const timeLeft = difficulty.gameParams.timeLimit;
  const girlPreferences = generateGirlsPreferences({
    gameParams: difficulty.gameParams,
    categories: Array.from(categories.values()),

    cards: Array.from(cards.values())
  });

  return {
    difficulty,
    categories,
    cards,
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

  const init = () => startNewGame(cards, categories, difficulty);

  function reducer(state: Readonly<GameState>, action: Readonly<GameAction>) {
    switch (action.type) {
      case "init":
        return init();
      case "deal":
        const newCards = dealCards(state);
        return {
          ...state,
          playersCards: state.playersCards.concat(newCards)
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

  const [gameState, dispatch] = useReducer(reducer, {}, init);

  const actions = gameActions(dispatch);

  return (
    <GameStateContext.Provider value={{ gameState, gameActions: actions }}>
      {children}
    </GameStateContext.Provider>
  );
}

export default function() {
  return useContext(GameStateContext) as GameStateContextType;
}
