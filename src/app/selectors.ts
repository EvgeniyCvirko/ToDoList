import {StatusType} from "./App-reducer";
import {AppRootStateType} from "../utils/types";

export const isInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
export const appStatus = (state: AppRootStateType): StatusType =>
  state.app.status;