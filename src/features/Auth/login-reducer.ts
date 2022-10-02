import {loginApi} from "../../api/todolists-api";
import {appSetErrorAC, appSetStatusAC} from "../../app/App-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {handleAsyncServerNetworkError} from "../../utils/error-utils";
//thunk
export const setLoginTC = createAsyncThunk('login/login', async (param: { stateLogin: LoginStateType }, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await loginApi.createLogin(param.stateLogin)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
            return {isLogin: true}
        } else {
            if (res.data.resultCode) {
                thunkAPI.dispatch(appSetErrorAC( {error:res.data.messages[0]}))
                thunkAPI.dispatch(appSetStatusAC({status: 'failed'}))
                return {isLogin: false}
            }
        }

    } catch (err) {
        const error = err as AxiosError
        handelServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})
export const setLogoutTC = createAsyncThunk('login/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
        try {
            const res = await loginApi.deleteLogin()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
                return {isLogin: false}
            } else {
                if (res.data.resultCode) {
                    thunkAPI.dispatch(appSetErrorAC({error: res.data.messages[0]}))
                    thunkAPI.dispatch(appSetStatusAC({status: 'failed'}))
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
export const slice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
    } as InitialStateType,
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setLoginTC.fulfilled, (state, action) => {
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
//action
export const asyncAction = {setLogoutTC,setLoginTC}
export const {setIsLogin} = slice.actions
export const loginReducer = slice.reducer
//type

export type LoginStateType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type InitialStateType = {
    isLogin: boolean
}
