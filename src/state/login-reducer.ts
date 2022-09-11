import {loginApi} from "../api/todolists-api";
import {appSetErrorAC, appSetStatusAC} from "./App-reducer";
import {handelServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./store";


//state
const initialState = {
    isLogin: false,
    loginState : {
        email: '',
        password: '',
        rememberMe: false
    }
}
const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLogin(state, action: PayloadAction<{isLogin:boolean}>){
            state.isLogin = action.payload.isLogin
        },
        setLoginForm(state, action: PayloadAction<{loginState:LoginStateType}>){
            state.loginState = action.payload.loginState
        }
    }
})
export const loginReducer = slice.reducer
//thunk
export const setLoginTC = (stateLogin: LoginStateType): AppThunk => {
    return dispatch => {
        dispatch(appSetStatusAC('loading'))
        loginApi.createLogin(stateLogin)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin({isLogin:true}))
                        dispatch(setLoginForm({loginState: stateLogin}))
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

export const setLogoutTC = ():AppThunk  => {
    return dispatch => {
        dispatch(appSetStatusAC('loading'))
        loginApi.deleteLogin()
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin({isLogin:false}))
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
//type
export const {setIsLogin,setLoginForm} = slice.actions
export type LoginStateType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type SetIsLoginType = ReturnType<typeof setIsLogin>
