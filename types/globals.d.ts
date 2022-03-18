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

DatePhase = 'SETTING_UP' | 'ACTIVE' | 'FINISHED'

interface DateNightState {
  datePhase: DatePhase
  dateNumber: number
  datePreferences?: DatePreferences
  dealersCards: Card[]
  playersCards: Card[]
  selectedCard?: Card
}

interface IGameState {
  activeScreen: GameScreenName
  difficulty?: Difficulty
}

type ConcreteGameState = Required<IGameState>

type InitialGameState = Pick<IGameState, 'activeScreen'> & Partial<IGameState>

////////////////// actions

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
