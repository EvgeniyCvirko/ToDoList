import {loginApi} from "../api/todolists-api";
import {handelServerNetworkError} from "../utils/error-utils";
import {setIsLogin} from "./login-reducer";
import {AppThunk} from "./store";
//types
export type AppSetErrorType = ReturnType <typeof appSetErrorAC>
export type AppSetStatusType = ReturnType <typeof appSetStatusAC>
type ActionsType = AppSetStatusType | AppSetErrorType | ReturnType <typeof setIsAuth>
export type StatusType= 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorType= string | null

export type InitialStateType = {
    status: StatusType
    error: ErrorType
    isAuth: boolean,
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isAuth: false,
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "SET-IS-AUTH":
            return {...state, isAuth: action.value}
        default:
            return state
    }
}
//action
export const appSetStatusAC = (status:StatusType) => ({type: "APP/SET-STATUS", status} as const)
export const appSetErrorAC = (error:ErrorType) => ({type: "APP/SET-ERROR", error} as const)
export const setIsAuth = (value: boolean) => ({type: "SET-IS-AUTH", value} as const)

export const setIsAuthTC = (): AppThunk => {
    return dispatch => {
        loginApi.getAuth()
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin({isLogin:true}))
                    }
                dispatch(setIsAuth(true))
                }
            )
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })

    }
}
