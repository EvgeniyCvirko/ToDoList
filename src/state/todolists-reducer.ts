import {toDoListsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppSetErrorType, appSetStatusAC, AppSetStatusType} from "./App-reducer";
import {handelServerAppError, handelServerNetworkError} from "../utils/error-utils";
//types
export type SetToDoListsActionType = ReturnType<typeof setTodolistsAC>
export type AddToDoActionType = ReturnType<typeof addToDoAC>
export type RemoveToDoActionType = ReturnType<typeof removeToDoAC>
type ActionType =
    | ReturnType<typeof changeFilterAC>
    | RemoveToDoActionType
    | ReturnType<typeof changeTitleAC>
    | AddToDoActionType
    | SetToDoListsActionType
export type ToDOListDomainType = TodoListType & {
    filter:FilterType
}
export type  FilterType = 'all' | 'active' | 'complete'
export type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number,
}
export type TodolistThunkType =
    | ReturnType<typeof setTodolistsAC>
    |ReturnType<typeof addToDoAC>
    |ReturnType<typeof removeToDoAC>
    |ReturnType<typeof changeTitleAC>
    | AppSetErrorType
    | AppSetStatusType
//state
const initialState: ToDOListDomainType[] =[]
export const todolistsReducer = (state: Array<ToDOListDomainType>=initialState, action: ActionType):  ToDOListDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return [...state.map(e=> e.id === action.id ? {...e, filter: action.filter} : e)]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistId)
        case "CHANGE-TITLE":
            return state.map(t=> t.id===action.todolistId ? {...t, title: action.title} : t)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state]
        case "SET-TODOLISTS":
            return action.todolists.map(e => ({...e, filter: 'all'}))
        default:
            return state
    }
}
//action
export const changeFilterAC = ( TodoList_ID: string, newFilter: FilterType ) =>({type: "CHANGE-FILTER", id: TodoList_ID, filter: newFilter } as const)
export const removeToDoAC = ( todolistId: string ) =>({type:"REMOVE-TODOLIST",  todolistId } as const)
export const changeTitleAC = (todolistId: string, title: string ) => ({type:"CHANGE-TITLE", todolistId, title } as const)
export const addToDoAC = (todolist: TodoListType ) => ({type:"ADD-TODOLIST", todolist  } as const)
export const setTodolistsAC = (todolists: Array<TodoListType> ) => ({type:"SET-TODOLISTS", todolists} as const)
//thunk
export const fetchTodolistsTC = () => {
    return (dispatch:Dispatch<TodolistThunkType>) =>{
        dispatch(appSetStatusAC('loading'))
    toDoListsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error) =>{
            handelServerNetworkError(error,dispatch)
        })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch:Dispatch<TodolistThunkType>) =>{
        toDoListsApi.deleteTodolist(todolistId)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(removeToDoAC(todolistId))
                }else{
                    handelServerAppError(res.data, dispatch )
                }
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch:Dispatch<TodolistThunkType >) =>{
        dispatch(appSetStatusAC('loading'))
        toDoListsApi.createTodolist(title)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(addToDoAC(res.data.data.item))
                }else{
                    handelServerAppError(res.data, dispatch )
                }
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}
export const updateTodolistTitleTC = (todolistId: string, title: string ) => {
    return (dispatch:Dispatch<TodolistThunkType>) =>{
        toDoListsApi.updateTodolist(todolistId,title)
            .then((res) => {
                dispatch(changeTitleAC(todolistId, title))
            })
            .catch((error) =>{
                handelServerNetworkError(error,dispatch)
            })
    }
}