import { isInitialized as selectorIsInitialized, appStatus as selectorAppStatus } from "./selectors";
import {asyncAction, slice} from './App-reducer'

const appReducer = slice.reducer
const appActions = {
  ...asyncAction,
  ...slice.actions
}
export {
  selectorIsInitialized,
  selectorAppStatus,
  appReducer,
  appActions,
}