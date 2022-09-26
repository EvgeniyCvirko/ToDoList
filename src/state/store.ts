import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../features/TodolistList/Todolist/TodoListForRender/Task/tasks-reducer";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./App-reducer";
import {loginReducer} from "./login-reducer";
import {configureStore} from "@reduxjs/toolkit";

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