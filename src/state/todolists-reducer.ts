import {v1} from "uuid";
import {toDoListsApi} from "../api/todolists-api";
import {Dispatch} from "redux";


type ActionType = ChangeFilterActionType
    | RemoveToDoActionType
    | ChangeTitleActionType
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

export type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    id: string
    filter: FilterType
}
export type RemoveToDoActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type ChangeTitleActionType = {
    type: "CHANGE-TITLE"
    todolistId: string
    title: string
}
export type AddToDoActionType = {
    type: "ADD-TODOLIST"
    todolist: TodoListType
}
export type SetToDoListsActionType = {
    type: "SET-TODOLISTS"
    todolists: Array<TodoListType>
}
export let toDoListID1 = v1();
export let toDoListID2 = v1();

const initialState: ToDOListDomainType[] =[]

export const todolistsReducer = (state: Array<ToDOListDomainType>=initialState, action: ActionType):  ToDOListDomainType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return  [...state.map(e=> e.id === action.id ? {...e, filter: action.filter} : e)]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistId)
        case "CHANGE-TITLE":
            return     [...state.map(t=> t.id===action.todolistId ? {...t, title: action.title} : t)]
        case "ADD-TODOLIST":
            const newTodolist:ToDOListDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist,...state ]
        case "SET-TODOLISTS":
            return action.todolists.map(e => {
                return {...e, filter: 'all'}
            })

        default:
            return state
    }
}

export const changeFilterAC = ( TodoList_ID: string, newFilter: FilterType ):ChangeFilterActionType =>{
    return {type: "CHANGE-FILTER", id: TodoList_ID, filter: newFilter }
}
export const removeToDoAC = ( todolistId: string ):RemoveToDoActionType =>{
    return {type:"REMOVE-TODOLIST",  todolistId }
}
export const changeTitleAC = (todolistId: string, title: string ):ChangeTitleActionType =>{
    return {type:"CHANGE-TITLE", todolistId, title }
}
export const addToDoAC = (todolist: TodoListType ):AddToDoActionType =>{
    return {type:"ADD-TODOLIST", todolist  }
}
export const setTodolistsAC = (todolists: Array<TodoListType> ):SetToDoListsActionType =>{
    return {type:"SET-TODOLISTS", todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch:Dispatch<ReturnType<typeof setTodolistsAC>>) =>{
    toDoListsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch:Dispatch<ReturnType<typeof removeToDoAC>>) =>{
        toDoListsApi.deleteTodolist(todolistId)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(removeToDoAC(todolistId))
                }
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch:Dispatch<ReturnType<typeof addToDoAC>>) =>{
        toDoListsApi.createTodolist(title)
            .then((res) => {
                dispatch(addToDoAC(res.data.data.item))
            })
    }
}
export const updateTodolistTitleTC = (todolistId: string, title: string ) => {
    return (dispatch:Dispatch<ReturnType<typeof changeTitleAC>>) =>{
        toDoListsApi.updateTodolist(todolistId,title)
            .then((res) => {
                dispatch(changeTitleAC(todolistId, title))
            })
    }
}