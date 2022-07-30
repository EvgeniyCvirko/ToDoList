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
    isAuth:boolean;
    loginState:LoginStateType
}

type LoginActionType =
    | ReturnType<typeof setLoginForm>
    | ReturnType<typeof setIsAuth>


export type LoginThunkType =
    | ReturnType<typeof setLoginForm>
    | ReturnType<typeof setIsAuth>
    | AppSetErrorType
    | AppSetStatusType

//state
const initialState: ReducerStateType = {
    isAuth: false,
    loginState : {
        email: '',
        password: '',
        rememberMe: false
    }
}

export const loginReducer = (state: ReducerStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case "SET-IS-AUTH":
            return {...state, isAuth:action.value}
        case "SET-LOGIN":
            // return {...state, email: action.stateLogin.email, password: action.stateLogin.password, rememberMe:action.stateLogin.rememberMe}
            return {...state, loginState: action.stateLogin}
        default :
            return state
    }

}
//action
export const setLoginForm = (stateLogin: LoginStateType) => ({type: "SET-LOGIN", stateLogin} as const)
export const setIsAuth = (value: boolean) => ({type: "SET-IS-AUTH", value} as const)
// export const setLoginForm = (email: string,  password: string,rememberMe: boolean ) => ({type: "SET-LOGIN", email, password, rememberMe} as const)
//thunk
export const setLoginTC = (stateLogin: LoginStateType) => {

    return (dispatch: Dispatch<LoginThunkType>) => {
        dispatch(appSetStatusAC('loading'))
        loginApi.createLogin(stateLogin)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsAuth(true))
                        dispatch(setLoginForm(stateLogin))
                        dispatch(appSetStatusAC('succeeded'))
                    } else {
                        if (res.data.resultCode === 1) {
                            dispatch(appSetErrorAC(' Request is invalid'))
                        }
                    }
                }
            )
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })

    }
}