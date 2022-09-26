import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AppRootStateType, AppDispatch} from '../state/store'
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()
  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])
  return boundActions
}