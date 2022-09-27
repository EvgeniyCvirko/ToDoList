import {AppRootStateType} from "./store";
import {StatusType} from "./App-reducer";

export const isInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
export const appStatus = (state: AppRootStateType): StatusType =>
  state.app.status;