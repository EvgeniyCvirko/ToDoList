import { isLogin as selectorIsLogin } from "./selectors";
import {asyncAction, slice} from './login-reducer'

const loginReducer = slice.reducer
const loginActions = {
  ...asyncAction,
  ...slice.actions
}
export {
  selectorIsLogin,
  loginReducer,
  loginActions,
}