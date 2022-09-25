import {loginApi} from "../api/todolists-api";
import {appSetErrorAC, appSetStatusAC} from "./App-reducer";
import {handelServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk('login/login', async (param: { stateLogin: LoginStateType }, {dispatch, rejectWithValue}) => {
    dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await loginApi.createLogin(param.stateLogin)
        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}))
            return {isLogin: true}
        } else {
            if (res.data.resultCode) {
                dispatch(appSetErrorAC( res.data.messages[0]))
                dispatch(appSetStatusAC({status: 'failed'}))
                return {isLogin: false}
            }
        }

    } catch (err) {
        const error = err as AxiosError
        handelServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const setLogoutTC = createAsyncThunk('login/logout', async (param, {dispatch, rejectWithValue}) => {
        dispatch(appSetStatusAC({status: 'loading'}))
        try {
            const res = await loginApi.deleteLogin()
            if (res.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}))
                return {isLogin: false}
            } else {
                if (res.data.resultCode) {
                    dispatch(appSetErrorAC( res.data.messages[0]))
                    dispatch(appSetStatusAC({status: 'failed'}))
                    return {isLogin: true}
                }
            }
        } catch (err) {
            const error = err as AxiosError
            handelServerNetworkError(error, dispatch)
            return rejectWithValue({error: error.message})
        }
    }
)

//state
const slice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
    },
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLogin = action.payload.isLogin
            }

        });
        builder.addCase(setLogoutTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLogin = action.payload.isLogin
            }
        })
    },
})

export const loginReducer = slice.reducer
//type
export const {setIsLogin} = slice.actions
export type LoginStateType = {
    email: string,
    password: string,
    rememberMe: boolean
}
