import { take, shuffle, remove } from "lodash";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useState } from "react";
import config, { Card, Difficulty } from "../../config";

export type PlayersCard = Card & { isDiscarded?: boolean };

interface DateNightConfig {
  difficulty: Difficulty;
  timeLeft: number;
  round: number;

  currentDeck: Card[];
  playersHand: PlayersCard[];

  actions?: DateNightActions;
}

interface DateNightActions {
  startNextRound: () => void;
  setDifficulty: (d: Difficulty) => void;

  drawCards: () => void;
  discardCard: (card: PlayersCard) => void;
}

const freshDeck = (difficulty: Difficulty) => {
  const deck = config.deckOfCards.map((i) => ({...i}));
  return difficulty.name === "easy"
    ? generateGirlsDeck(deck, difficulty)
    : deck;
};

const draw = (amount: number, availableCards: Card[]) =>
  remove(availableCards, (c, index) => index < amount);

const createState = (difficulty: Difficulty) => {
  const deck = freshDeck(difficulty);
  return {
    difficulty,
    timeLeft: difficulty.gameParams.timeLimit,
    round: 1,
    currentDeck: deck,
    playersHand: draw(5, deck),
  };
};

const getGirlsLikedCategories = (difficulty: Difficulty) => {
  const categoriesAvailable = take(
    shuffle(config.cardCategories),
    difficulty.gameParams.categories
  );
  return take(shuffle(categoriesAvailable)).map((c) => c.id);
};

const generateGirlsDeck = (deck: Card[], difficulty: Difficulty) => {
  const likedCategoryIds = getGirlsLikedCategories(difficulty);
  const { notInCategories, inCategories: likedCards } = deck.reduce<{
    inCategories: Card[];
    notInCategories: Card[];
  }>(
    (memo, card) => {
      if (card.categoryIds.some((id) => likedCategoryIds.indexOf(id) > -1)) {
        memo.notInCategories.push(card);
      } else {
        memo.inCategories.push(card);
      }
      return memo;
    },
    { inCategories: [], notInCategories: [] }
  );

  const lovedCards = take(notInCategories, difficulty.gameParams.loves);
  const hatedCards = take(notInCategories, difficulty.gameParams.hates);
  return likedCards.concat(lovedCards).concat(hatedCards);
};

const defaultConfig: DateNightConfig = createState(config.gameDifficulties[0]);

const DateNightConfigContext = React.createContext(defaultConfig);

export function DateNightConfigProvider({ children }: PropsWithChildren<{}>) {
  const [dateNightConfig, setConfig] = useState<DateNightConfig>(
    createState(config.gameDifficulties[0])
  );

  useEffect(() => {
    const tick = () => {
      return setTimeout(() => {
        setConfig((prev) => {
          const nextTick = prev.timeLeft - 1;
          if (nextTick > 0) tick();

          return {
            ...prev,
            timeLeft: nextTick < 0 ? 0 : nextTick,
          };
        });
      }, 1000);
    };
    const timer = dateNightConfig.timeLeft > 0 ? tick() : undefined;

    return () => {
      timer && clearTimeout(timer);
    };
  }, [dateNightConfig.round]);

  const actions = useMemo(() => {
    return {
      setDifficulty: (difficulty: Difficulty) => {
        setConfig(createState(difficulty));
      },
      startNextRound: () => {
        setConfig((prev) => {
          return {
            difficulty: prev.difficulty,
            timeLeft: prev.difficulty.gameParams.timeLimit,
            round: prev.round + 1,
            playersHand: draw(5, dateNightConfig.currentDeck),
            currentDeck: freshDeck(prev.difficulty),
            actions: prev.actions,
          };
        });
      },
      drawCards: () => {
        const withoutDiscarded = dateNightConfig.playersHand.reduce<PlayersCard[]>((m, c) => {
          if (!c.isDiscarded) m.push(c);
          return m;
        }, []);

        const newCards = draw(
          config.cardsPerHand - withoutDiscarded.length,
          dateNightConfig.currentDeck
        );

        setConfig((prev) => {
          return {
            ...prev,
            playersHand: withoutDiscarded.concat(newCards),
          };
        });
      },
      discardCard: (card: PlayersCard) => {
        card.isDiscarded = true;
      },
    };
  }, [dateNightConfig.currentDeck, dateNightConfig.playersHand]);

  return (
    <DateNightConfigContext.Provider value={{ ...dateNightConfig, actions }}>
      {children}
    </DateNightConfigContext.Provider>
  );
}

export default function useDateNightConfig(): Required<DateNightConfig> {
  return useContext(DateNightConfigContext) as Required<DateNightConfig>;
}
