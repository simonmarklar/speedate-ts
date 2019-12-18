import React, {
  useState,
  PropsWithChildren,
  useCallback,
  useContext
} from "react";
import useFetch from "../hooks/useFetch";
import NetworkError from "../components/network-error";
import Loading from "../components/loading";

export interface Difficulty {
  name: string;

  menuItem: {
    description: string;
    playerImage: string;
  };

  gameParams: {
    categories: number;
    likes: number;
    loves: number;
    hates: number;
    timeLimit: number;
    getNumber: number;
    soulmate: number;
  };
}

export type DifficultyMap = Map<string, Difficulty>;

type DifficultyContextValue = {
  difficulties: DifficultyMap;
  selectedDifficulty: Difficulty;
  selectDifficulty: (arg0: string | void) => void;
};

const DifficultyContext = React.createContext<Partial<DifficultyContextValue>>(
  {}
);

export function DifficultyProvider({ children }: PropsWithChildren<{}>) {
  const [difficultyJson, isFetching, fetchError] = useFetch(
    "/assets/config/difficulties.json"
  );

  const difficulties: Map<string, Difficulty> = difficultyJson
    ? new Map(difficultyJson.map((d: Difficulty) => [d.name, d]))
    : new Map();

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>();
  const selectDifficulty = useCallback(
    (difficultyKey: string | void) => {
      if (!difficulties) return;
      const d = difficultyKey
        ? (difficulties.get(difficultyKey) as Difficulty)
        : undefined;

      setSelectedDifficulty(d);
    },
    [difficulties]
  );

  if (isFetching) return <Loading />;
  if (fetchError) return <NetworkError message={fetchError.message} />;

  return (
    <DifficultyContext.Provider
      value={{ difficulties, selectedDifficulty, selectDifficulty }}
    >
      {children}
    </DifficultyContext.Provider>
  );
}

export default function() {
  return useContext(DifficultyContext) as DifficultyContextValue;
}
