import {taskObjType} from "../App";
import {AddToDoActionType, RemoveToDoActionType} from "./todolists-reducer";
import {v1} from "uuid";

type ActionTasksType = ChangeStatusTasksActionType
    | RemoveTasksActionType
    | ChangeTitleTasksActionType
    | AddTasksActionType
    | AddToDoActionType
    |RemoveToDoActionType

export type ChangeStatusTasksActionType = {
    type: "CHANGE-STATUS"
    id: string
    isDone: boolean
    todolistId: string
}
export type RemoveTasksActionType = {
    type: "REMOVE-TASKS"
    todolistId: string
    id: string
}
export type ChangeTitleTasksActionType = {
    type: "CHANGE-TITLE-TASKS"
    todolistId: string
    id: string
    title: string
}
export type AddTasksActionType = {
    type: "ADD-TASKS"
    newTitle: string
    todolistId: string
}


const initialState ={}

export const tasksReducer = (state: taskObjType=initialState, action: ActionTasksType): taskObjType => {

        switch (action.type) {
        case "CHANGE-STATUS":
            return {...state,
            [action.todolistId] : state[action.todolistId].map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
        }
        case "REMOVE-TASKS":
            return {...state,
            [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.id) }
        case "CHANGE-TITLE-TASKS":
            return {...state,
            [action.todolistId] : state[action.todolistId].map(t => t.id === action.id ? {...t, title: action.title}: t)}
        case "ADD-TASKS":
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            return {...state,
            [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "ADD-TODOLIST":
            return {...state,
            [action.todolistId]: []}
        case "REMOVE-TODOLIST":
                const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default:
            return state
    }
}

export const changeStatusTasksAC = (id: string, isDone: boolean, todolistId: string ):ChangeStatusTasksActionType =>{
    return {type: "CHANGE-STATUS", id, isDone, todolistId  }
}
export const removeTasksAC = (todolistId: string, id: string ):RemoveTasksActionType =>{
    return {type:"REMOVE-TASKS", todolistId, id }
}
export const changeTitleTasksAC = (todolistId: string, id: string, title: string ):ChangeTitleTasksActionType =>{
    return {type:"CHANGE-TITLE-TASKS", todolistId, id, title }
}
export const addTasksAC = (newTitle: string, todolistId: string ):AddTasksActionType =>{
    return {type:"ADD-TASKS", newTitle, todolistId }
}