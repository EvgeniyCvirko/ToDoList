import {AddToDoActionType, RemoveToDoActionType, SetToDoListsActionType} from "./todolists-reducer";
import {v1} from "uuid";

export type taskObjType={
    [key: string]: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatues
    priority: TaskPriority
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
export enum TaskStatues{
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriority{
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
type ActionTasksType = ChangeStatusTasksActionType
    | RemoveTasksActionType
    | ChangeTitleTasksActionType
    | AddTasksActionType
    | AddToDoActionType
    | RemoveToDoActionType
    | SetToDoListsActionType

export type ChangeStatusTasksActionType = {
    type: "CHANGE-STATUS"
    id: string
    status: TaskStatues
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


const initialState: taskObjType ={}

export const tasksReducer = (state: taskObjType=initialState, action: ActionTasksType): taskObjType => {

        switch (action.type) {
        case "CHANGE-STATUS":
            return {...state,
            [action.todolistId] : state[action.todolistId].map(t => t.id === action.id ? {...t, status: action.status} : t)
        }
        case "REMOVE-TASKS":
            return {...state,
            [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.id) }
        case "CHANGE-TITLE-TASKS":
            return {...state,
            [action.todolistId] : state[action.todolistId].map(t => t.id === action.id ? {...t, title: action.title}: t)}
        case "ADD-TASKS":
            const newTask:TaskType = {
                id: v1(),
                todoListId:action.todolistId,
                title: action.newTitle,
                status:TaskStatues.New,
                priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false}
            return {...state,
            [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "ADD-TODOLIST":
            return {...state,
            [action.todolistId]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
            case "SET-TODOLISTS":
                const stateCopy = {...state}
                action.todolists.forEach(e=> {
                    stateCopy[e.id] = []
                })
                return stateCopy
            default:
            return state
    }
}

export const changeStatusTasksAC = (id: string, status: TaskStatues, todolistId: string ):ChangeStatusTasksActionType =>{
    return {type: "CHANGE-STATUS", id, status, todolistId  }
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