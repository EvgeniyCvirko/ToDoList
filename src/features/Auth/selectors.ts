import {AppRootStateType} from "../../app/store";

export const isLogin = (state: AppRootStateType): boolean =>
  state.login.isLogin;