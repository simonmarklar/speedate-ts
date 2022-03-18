import React, {
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { createReducer, init, DateNightAction } from '../state/date-night'

type ActionsWithNoValue = ActionTypesWithNoValue<DateNightAction>

interface IDateNightStateContext {
  state: DateNightState
  dispatch: React.Dispatch<DateNightAction>
}

const initialDateNightState: DateNightState = {
  dateNumber: 1,
  datePhase: 'SETTING_UP',
  playersCards: [],
  dealersCards: [],
}

const DateNightStateContext = React.createContext<IDateNightStateContext>({
  state: initialDateNightState,
  dispatch: () => undefined,
})

DateNightStateContext.displayName = 'DateNightStateContext'

export function DateNightStateProvider({
  difficulty,
  children,
}: PropsWithChildren<{ difficulty: Difficulty }>) {
  const reducer = useMemo(() => createReducer(difficulty), [difficulty])

  const [state, dispatch] = useReducer(
    reducer,
    initialDateNightState,
    (state) => {
      return { ...state, ...init(difficulty) }
    },
  )

  return (
    <DateNightStateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateNightStateContext.Provider>
  )
}

export function useDateNightState(): DateNightState {
  return useContext(DateNightStateContext).state
}

export function useDateNightDispatch() {
  const { dispatch } = useContext(DateNightStateContext)

  return React.useCallback(
    <T extends DateNightAction | ActionsWithNoValue>(
      action: T extends ActionsWithNoValue
        ? ActionsWithNoValue
        : DateNightAction,
    ) => {
      dispatch(
        typeof action === 'string'
          ? {
              type: action,
            }
          : action,
      )
    },
    [dispatch],
  )
}
