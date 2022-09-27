import {useAppSelector} from "../../utils/hooks";
import {AppRootStateType} from "../../app/store";

export const selectorIsLogin = (state: AppRootStateType): boolean =>
  state.login.isLogin;