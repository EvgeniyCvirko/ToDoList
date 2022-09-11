import {toDoListsApi} from "../api/todolists-api";
import {appSetStatusAC} from "./App-reducer";
import {handelServerAppError, handelServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./store";
//types


//state

const initialState: ToDOListDomainType[] =[]

const slice = createSlice({
    name: 'todolist',
    initialState:initialState,
    reducers:{
        changeFilterAC(state, action:PayloadAction<{TodoList_ID: string, newFilter: FilterType}>){
            const index = state.findIndex(el => el.id === action.payload.TodoList_ID)
            state[index].filter = action.payload.newFilter
        },
        removeToDoAC(state, action:PayloadAction<{todolistId: string}>){
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index > - 1){
                state.splice(index,1)
            }
        },
        changeTitleAC(state, action:PayloadAction<{todolistId: string, title: string}>){
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        addToDoAC(state, action:PayloadAction<{todolist: TodoListType }>){
            state.unshift({...action.payload.todolist, filter: 'all'})
        },
        setTodolistsAC(state, action:PayloadAction<{todolists: Array<TodoListType>}>){
            return action.payload.todolists.map(e => ({...e, filter: 'all'}))
        },
    }
})
export const todolistsReducer = slice.reducer

//thunk
export const fetchTodolistsTC = (): AppThunk => {
    return dispatch =>{
        dispatch(appSetStatusAC({status:'loading'}))
    toDoListsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({ todolists:res.data}))
            dispatch(appSetStatusAC({status:'succeeded'}))
        })
        .catch((error) =>{
            handelServerNetworkError(error,dispatch)
        })
    }
}
export const removeTodolistsTC = (todolistId: string): AppThunk => {
    return dispatch =>{
        toDoListsApi.deleteTodolist(todolistId)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(removeToDoAC({todolistId}))
                }else{
                    handelServerAppError(res.data, dispatch )
                }
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}
export const addTodolistsTC = (title: string): AppThunk => {
    return dispatch =>{
        dispatch(appSetStatusAC({status:'loading'}))
        toDoListsApi.createTodolist(title)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(addToDoAC({todolist: res.data.data.item}))
                }else{
                    handelServerAppError(res.data, dispatch )
                }
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}
export const updateTodolistTitleTC = (todolistId: string, title: string ): AppThunk => {
    return dispatch =>{
        toDoListsApi.updateTodolist(todolistId,title)
            .then(() => {
                dispatch(changeTitleAC({todolistId, title}))
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}
//types
export const {changeFilterAC,removeToDoAC,changeTitleAC,addToDoAC,setTodolistsAC } = slice.actions
export type ToDOListDomainType = TodoListType & {
    filter:FilterType
}
export type SetToDoListsActionType = ReturnType<typeof setTodolistsAC>
export type AddToDoActionType = ReturnType<typeof addToDoAC>
export type RemoveToDoActionType = ReturnType<typeof removeToDoAC>

export type  FilterType = 'all' | 'active' | 'complete'
export type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number,
}