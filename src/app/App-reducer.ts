import {loginApi} from "../api/todolists-api";
import {handelServerNetworkError} from "../utils/error-utils";
import {setIsLogin} from "../features/Auth/login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
//thunk
export const setIsInitializedTC = createAsyncThunk("app/setIsAuth", async (param, {dispatch, rejectWithValue}) => {
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
        appSetErrorAC(state, action: PayloadAction< string | null >) {
            state.error = action.payload
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
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
