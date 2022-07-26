import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistsReducer
})

export const store =createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType,unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType,AppRootStateType,unknown, AnyAction>
// @ts-ignore
window.store = store