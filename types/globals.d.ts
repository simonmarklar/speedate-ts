interface GameParameters {
  numberOfCategories: number
  numberOfLikes: number
  numberOfLoves: number
  numberOfHates: number
  timeLimit: number
  phoneNumberThreshold: number
  soulmateThreshold: number
}

interface Difficulty {
  name: GameDifficultyName
  description: string
  gameParams: GameParameters
}

interface Card {
  categories: string[]
  name: string
}

enum GameScreen {
  LOADING,
  MENU,
  DATE,
  DATE_SUMMARY,
  NIGHT_SUMMARY,
}

type GameScreenName = keyof typeof GameScreen

enum GameDifficulty {
  EASY,
  MEDIUM,
  HARD,
}

type GameDifficultyName = keyof typeof GameDifficulty

interface PlayerState {
  cards: Card[]
}

interface DatePreferences {
  likedCategories: string[]
  lovedCards: Card[]
  hatedCards: Card[]
}

interface DateNightState {
  dateNumber: number
  timeLeft?: number
  dealersCards: Card[]
  playersCards: Card[]
  datePreferences?: DatePreferences
  selectedCard?: Card
}

interface GlobalGameState {
  activeScreen: GameScreenName
  dateNightState?: DateNightState
  difficulty?: Difficulty
}

interface ActionWithNoValue<T extends string> {
  type: T
}

interface ActionWithValue<T extends string, V = any> {
  type: T
  value: V
}

type ActionTypes<ActionUnion> = Extract<ActionUnion, { value: any }> extends A
  ? A
  : never

type ActionTypesWithValue<ActionUnion> = Extract<
  ActionUnion,
  { value: any }
> extends {
  type: infer T
}
  ? T
  : never

type ActionTypesWithNoValue<ActionUnion> = Exclude<
  ActionUnion['type'],
  ActionTypesWithValue<ActionUnion>
>
