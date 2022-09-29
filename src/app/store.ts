import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../features/Auth/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/TodolistList/Todolist/TodoListForRender/Task";
import {todolistsReducer} from "../features/TodolistList/Todolist";
import {appReducer} from "./index";

export const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistsReducer,
    app:appReducer,
    login: loginReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
// @ts-ignore
window.store = store