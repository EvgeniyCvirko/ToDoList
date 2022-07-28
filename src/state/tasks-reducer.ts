import {AddToDoActionType, RemoveToDoActionType, SetToDoListsActionType} from "./todolists-reducer";
import {ModelTaskUpdateType, tasksApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type taskObjType = {
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
export enum TaskStatues {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriority {
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
    | SetTasksActionType
    | ReturnType<typeof updateTasksAC>

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
    task: TaskType
    todolistId: string
}
export type SetTasksActionType = {
    type: "SET-TASKS"
    todolistId: string
    tasks: Array<TaskType>
}
export type ModelDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}

const initialState: taskObjType = {}

export const tasksReducer = (state: taskObjType = initialState, action: ActionTasksType): taskObjType => {

    switch (action.type) {
        case "UPDATE-TASK":
            return {...state,
            [action.todolistId] : state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case "CHANGE-TITLE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TASKS": {
            const copyState = {...state}
            const newTask = action.task
            const tasks = copyState[newTask.todoListId]
            copyState[newTask.todoListId] = [newTask, ...tasks]
            return copyState
        }
        case "ADD-TODOLIST":
            return {
                [action.todolist.id]: [],
                ...state
            }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolists.forEach(e => {
                stateCopy[e.id] = []
            })
            return stateCopy
        case "SET-TASKS":
            return {...state,
            [action.todolistId]: action.tasks}
        default:
            return state
    }
}

export const updateTasksAC = (todolistId: string, taskId: string, model: ModelDomainTaskType) =>
    ({type: "UPDATE-TASK", todolistId, taskId, model } as const)
export const removeTasksAC = (todolistId: string, id: string): RemoveTasksActionType => {
    return {type: "REMOVE-TASKS", todolistId, id}
}
export const addTasksAC = (task: TaskType, todolistId: string): AddTasksActionType => {
    return {type: "ADD-TASKS", task, todolistId}
}
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: "SET-TASKS", todolistId, tasks}
}
export const setTasksTC = (todolistId: string) =>{
    return (dispatch:Dispatch<ReturnType<typeof SetTasksAC>>) => {
        tasksApi.getTask(todolistId)
            .then(res => {
                dispatch(SetTasksAC(todolistId, res.data.items))
            })
    }
}
export const addTasksTC = (newTitle:string, todolistId: string) =>{
    return (dispatch:Dispatch<ReturnType<typeof addTasksAC>>) => {
        tasksApi.createTask(newTitle,todolistId)
            .then(res => {
                dispatch(addTasksAC(res.data.data.item,todolistId))
            })
    }
}
export const removeTasksTC = ( todolistId:string, taskId: string) =>{
    return (dispatch:Dispatch<ReturnType<typeof removeTasksAC>>) => {
        tasksApi.deleteTasks(todolistId, taskId)
            .then(res => {
                if(res.data.resultCode === 0){
                dispatch(removeTasksAC(todolistId,taskId))}
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: ModelDomainTaskType) => {
    return (dispatch: Dispatch<ReturnType<typeof updateTasksAC>>, getState:() => AppRootStateType) => {
        const state = getState()
        const task = state.task[todolistId].find( t => t.id === taskId)
        if(!task){
            console.warn('task is not found')
            return
        }
        const apiModel: ModelTaskUpdateType ={
            title:task.title ,
            description:task.description ,
            completed:task.completed ,
            status: task.status,
            priority: task.priority,
            startDate:task.startDate ,
            deadline: task.deadline,
            ...model,
        }
        tasksApi.updateTask(todolistId,taskId, apiModel )
            .then( res =>{
                dispatch(updateTasksAC(todolistId,taskId, model))
            })
    }
}