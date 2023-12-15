import React, {
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { createReducer, init, DateNightAction } from '../state/date-night'
import { useAsyncAction } from './useAsyncAction'
import logger from '../lib/log'

type ActionsWithNoValue = ActionTypesWithNoValue<DateNightAction>

interface IDateNightStateContext {
  state: DateNightState
  dispatch: React.Dispatch<DateNightAction>
  asyncAction: <T>(action: T) => any
}

const initialDateNightState: DateNightState = {
  dateNumber: 1,
  datePhase: 'SETTING_UP',
  playersCards: [],
  dealersCards: [],
  girlsAlreadySeen: [],
}

const DateNightStateContext = React.createContext<IDateNightStateContext>({
  state: initialDateNightState,
  dispatch: () => undefined,
  asyncAction: () => () => undefined,
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

  const asyncAction = useAsyncAction(dispatch)

  return (
    <DateNightStateContext.Provider value={{ state, dispatch, asyncAction }}>
      {children}
    </DateNightStateContext.Provider>
  )
}

export function useDateNightState(): DateNightState {
  return useContext(DateNightStateContext).state
}

export function useDateNightDispatch() {
  const { dispatch } = useContext(DateNightStateContext)

  const handleActions = <
    T extends
      | DateNightAction['type']
      | ActionsWithNoValue
      | ((action: any) => any),
  >(
    action: T extends Function
      ? any
      : T extends ActionsWithNoValue
      ? ActionsWithNoValue
      : DateNightAction,
  ) => {
    logger.debug(action)
    if (typeof action === 'function') {
      return action(handleActions)
    } else {
      dispatch(
        typeof action === 'string'
          ? {
              type: action,
            }
          : action,
      )
    }
  }

  return React.useCallback(handleActions, [dispatch])
}
