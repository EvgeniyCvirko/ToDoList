//type

import {Dispatch} from "redux";
import {loginApi} from "../api/todolists-api";
import {appSetErrorAC, AppSetErrorType, appSetStatusAC, AppSetStatusType} from "./App-reducer";
import {handelServerNetworkError} from "../utils/error-utils";

export type LoginStateType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type ReducerStateType = {
    isLogin:boolean;
    loginState:LoginStateType
}

type LoginActionType =
    | ReturnType<typeof setLoginForm>
    | SetIsLoginType

export type SetIsLoginType = ReturnType<typeof setIsLogin>

export type LoginThunkType =
    | ReturnType<typeof setLoginForm>
    | SetIsLoginType
    | AppSetErrorType
    | AppSetStatusType

//state
const initialState: ReducerStateType = {
    isLogin: false,
    loginState : {
        email: '',
        password: '',
        rememberMe: false
    }
}

export const loginReducer = (state: ReducerStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, isLogin:action.value}
        case "SET-LOGIN":
            return {...state, loginState: action.stateLogin}
        default :
            return state
    }

}
//action
export const setLoginForm = (stateLogin: LoginStateType) => ({type: "SET-LOGIN", stateLogin} as const)
export const setIsLogin = (value: boolean) => ({type: "SET-IS-LOGIN", value} as const)
//thunk
export const setLoginTC = (stateLogin: LoginStateType) => {

    return (dispatch: Dispatch<LoginThunkType>) => {
        dispatch(appSetStatusAC('loading'))
        loginApi.createLogin(stateLogin)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin(true))
                        dispatch(setLoginForm(stateLogin))
                        dispatch(appSetStatusAC('succeeded'))
                    } else {
                        if (res.data.resultCode) {
                            dispatch(appSetErrorAC(res.data.messages[0]))
                            dispatch(appSetStatusAC('failed'))
                        }
                    }
                }
            )
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })

    }
}

export const setLogoutTC = () => {

    return (dispatch: Dispatch<LoginThunkType>) => {
        dispatch(appSetStatusAC('loading'))
        loginApi.deleteLogin()
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin(false))
                        dispatch(appSetStatusAC('succeeded'))
                    } else {
                        if (res.data.resultCode) {
                            console.log(res.data.resultCode)
                            dispatch(appSetErrorAC(res.data.messages[0]))
                            dispatch(appSetStatusAC('failed'))
                        }
                    }
                }
            )
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })

    }
}
