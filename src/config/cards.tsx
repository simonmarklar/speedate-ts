import React, { PropsWithChildren, useContext } from "react";
import useFetch from "../hooks/useFetch";
import NetworkError from "../components/network-error";

interface CardData {
  categoryIds: number[];
  name: string;
}
export type Card = CardData & {
  categories: string[];
};

export type CardMap = Map<string, Card>;

type CardsContextValue = {
  cards: CardMap;
  categories: Set<string>;
};
export const CardsContext = React.createContext<Partial<CardsContextValue>>({});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useCardData() {
  const [cardJson, isFetchingCards, fetchCardError] = useFetch<CardData[]>(
    "/assets/config/cards.json"
  );
  const [categoriesJson, isFetchingCategories, fetchCategoriesError] = useFetch<
    string[]
  >("/assets/config/categories.json");

  const cards: CardMap =
    cardJson && categoriesJson
      ? new Map(
          cardJson.map(c => [
            c.name,
            {
              ...c,
              categories: c.categoryIds.map(catId => categoriesJson[catId])
            }
          ])
        )
      : new Map();

  const categories: Set<string> = categoriesJson
    ? new Set(categoriesJson)
    : new Set();

  return {
    cards,
    categories,
    isFetchingCards,
    fetchCardError,
    isFetchingCategories,
    fetchCategoriesError
  };
}

export function CardsProvider({ children }: PropsWithChildren<{}>) {
  const [cardJson, isFetchingCards, fetchCardError] = useFetch<CardData[]>(
    "/assets/config/cards.json"
  );
  const [categoriesJson, isFetchingCategories, fetchCategoriesError] = useFetch<
    string[]
  >("/assets/config/categories.json");

  const cards: CardMap =
    cardJson && categoriesJson
      ? new Map(
          cardJson.map(c => [
            c.name,
            {
              ...c,
              categories: c.categoryIds.map(catId => categoriesJson[catId])
            }
          ])
        )
      : new Map();

  const categories: Set<string> = categoriesJson
    ? new Set(categoriesJson)
    : new Set();

  if (isFetchingCards || isFetchingCategories) return <p>Loading...</p>;
  if (fetchCardError || fetchCategoriesError)
    return (
      <NetworkError
        message={
          fetchCardError
            ? fetchCardError
            : fetchCategoriesError
            ? fetchCategoriesError
            : ""
        }
      />
    );

  return (
    <CardsContext.Provider
      value={{
        cards,
        categories
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export default function() {
  const ctx = useContext(CardsContext) as CardsContextValue;

  return ctx;
}
