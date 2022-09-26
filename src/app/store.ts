import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "../state/App-reducer";
import {loginReducer} from "../state/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/TodolistList/Todolist/TodoListForRender/Task";
import {todolistsReducer} from "../features/TodolistList/Todolist";

const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistsReducer,
    app:appReducer,
    login: loginReducer,
})

//export const store =createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType,unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType,AppRootStateType,unknown, AnyAction>
// @ts-ignore
window.store = store