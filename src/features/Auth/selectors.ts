import {AppRootStateType} from "../../utils/types";

export const isLogin = (state: AppRootStateType): boolean =>
  state.login.isLogin;