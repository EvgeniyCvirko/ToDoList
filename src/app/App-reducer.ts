import {loginApi} from "../api/todolists-api";
import {setIsLogin} from "../features/Auth/login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {handleAsyncServerNetworkError} from "../utils/error-utils";
//thunk
export const setIsInitializedTC = createAsyncThunk("app/setIsAuth", async (param,thunkAPI) => {
    try {
        const res = await loginApi.getAuth()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLogin({isLogin: true}))
        }
        // return {isAuth: true}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleAsyncServerNetworkError(error, thunkAPI, false)
        }
    }
})

//state
export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        appSetStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        appSetErrorAC(state, action: PayloadAction<{ error:string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setIsInitializedTC.fulfilled, (state) => {
            state.isInitialized = true
        });
    }
})


//action
export const asyncAction = {setIsInitializedTC}
export const {appSetStatusAC, appSetErrorAC} = slice.actions
//types
export type InitialStateType = {
    status: StatusType
    error: string | null
    isInitialized: boolean,
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
