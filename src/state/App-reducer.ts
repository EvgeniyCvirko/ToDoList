import {loginApi} from "../api/todolists-api";
import {handelServerNetworkError} from "../utils/error-utils";
import {setIsLogin} from "./login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
//thunk
export const setIsAuthTC = createAsyncThunk("app/setIsAuth", async (param, {dispatch, rejectWithValue}) => {
    try {
        const res = await loginApi.getAuth()
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: true}))
        }
        return {isAuth: true}
    } catch (err) {
        const error = err as Error | AxiosError
        handelServerNetworkError(error, dispatch)
        return rejectWithValue({error: error.message})
    }
})

//state
const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isAuth: false,
    } as InitialStateType,
    reducers: {
        appSetStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        appSetErrorAC(state, action: PayloadAction< string | null >) {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setIsAuthTC.fulfilled, (state) => {
            state.isAuth = true
        });
    }
})

export const appReducer = slice.reducer


//types

export type InitialStateType = {
    status: StatusType
    error: string | null
    isAuth: boolean,
}
export const {appSetStatusAC, appSetErrorAC} = slice.actions
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
