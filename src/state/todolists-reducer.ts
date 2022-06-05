import {v1} from "uuid";


type ActionType = ChangeFilterActionType | RemoveToDoActionType | ChangeTitleActionType | AddToDoActionType
type ToDOListType = {
    id: string
    title: string
    filter: string
}


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
export let toDoListID1 = v1();
export let toDoListID2 = v1();

const initialState =[
    {id: toDoListID1, title: 'What to learn', filter:'all'},
    {id: toDoListID2, title: 'What to buy', filter:'all'},
]

export const todolistsReducer = (state: Array<ToDOListType>=initialState, action: ActionType): Array<ToDOListType> => {
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
            return state
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