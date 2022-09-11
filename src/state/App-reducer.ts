import {loginApi} from "../api/todolists-api";
import {handelServerNetworkError} from "../utils/error-utils";
import {setIsLogin} from "./login-reducer";
import {AppThunk} from "./store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
const initialState = {
    status: 'idle',
    error: null as string | null,
    isAuth: false,
}
const slice = createSlice({
    name: 'app',
    initialState:initialState,
    reducers:{
        appSetStatusAC(state, action: PayloadAction<{status:StatusType}>){
            state.status = action.payload.status
        },
        appSetErrorAC(state, action: PayloadAction<{error:string | null}>){
            state.error = action.payload.error
        },
        setIsAuth(state, action: PayloadAction<{isAuth:boolean}>){
            state.isAuth = action.payload.isAuth
        },
    }
})

export const appReducer = slice.reducer

export const setIsAuthTC = (): AppThunk => {
    return dispatch => {
        loginApi.getAuth()
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLogin({isLogin:true}))
                    }
                dispatch(setIsAuth({isAuth:true}))
                }
            )
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })

    }
}
//types
export const {appSetStatusAC,appSetErrorAC,setIsAuth } = slice.actions
export type AppSetErrorType = ReturnType <typeof appSetErrorAC>
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>
export type StatusType= 'idle' | 'loading' | 'succeeded' | 'failed'
