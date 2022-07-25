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
    id: string
}
export type ChangeTitleActionType = {
    type: "CHANGE-TITLE"
    id: string
    title: string
}
export type AddToDoActionType = {
    type: "ADD-TODOLIST"
    todolistId: string
    title:string
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
            return state.filter(el => el.id !== action.id)
        case "CHANGE-TITLE":
            return     [...state.map(t=> t.id===action.id ? {...t, title: action.title} : t)]
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter : 'all', addedDate: new Date(), order:0 },...state]
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
export const removeToDoAC = ( todolistId1: string ):RemoveToDoActionType =>{
    return {type:"REMOVE-TODOLIST", id: todolistId1 }
}
export const changeTitleAC = (todolistId1: string, newTitle: string ):ChangeTitleActionType =>{
    return {type:"CHANGE-TITLE", id: todolistId1, title: newTitle }
}
export const addToDoAC = (title: string ):AddToDoActionType =>{
    return {type:"ADD-TODOLIST", title, todolistId: v1()  }
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