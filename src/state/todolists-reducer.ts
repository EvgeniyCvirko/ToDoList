import {ToDOListType} from "../App";
import {v1} from "uuid";


type ActionType = ChangeFilterActionType | RemoveToDoActionType | ChangeTitleActionType | AddToDoActionType

export type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    id: string
    filter: string
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


export const todolistsReducer = (state: Array<ToDOListType>, action: ActionType): Array<ToDOListType> => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return  [...state.map(e=> e.id === action.id ? {...e, filter: action.filter} : e)]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)

        case "CHANGE-TITLE":
            return     [...state.map(t=> t.id===action.id ? {...t, title: action.title} : t)]
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter : 'all'},...state]

        default:
            throw new Error("I don't understand this type")
    }
}

export const changeFilterAC = ( TodoList_ID: string, newFilter: string ):ChangeFilterActionType =>{
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