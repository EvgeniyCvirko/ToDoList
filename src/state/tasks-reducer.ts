import {AddToDoActionType, RemoveToDoActionType, SetToDoListsActionType} from "./todolists-reducer";
import {ModelTaskUpdateType, tasksApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
//types
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

type ActionTasksType =
    | ReturnType<typeof updateTasksAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof SetTasksAC>
    | AddToDoActionType
    | RemoveToDoActionType
    | SetToDoListsActionType
export type ModelDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}
//state
const initialState: taskObjType = {}
export const tasksReducer = (state: taskObjType = initialState, action: ActionTasksType): taskObjType => {
    switch (action.type) {
        case "UPDATE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case "ADD-TASKS":
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case "ADD-TODOLIST":
            return {[action.todolist.id]: [], ...state}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(e => {
                stateCopy[e.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
//action
export const updateTasksAC = (todolistId: string, taskID: string, model: ModelDomainTaskType) =>
    ({type: "UPDATE-TASKS", todolistId, taskID, model} as const)
export const removeTasksAC = (todolistId: string, id: string) => ({type: "REMOVE-TASKS", todolistId, id} as const)
export const addTasksAC = (task: TaskType, todolistId: string) => ({type: "ADD-TASKS", task, todolistId} as const)
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: "SET-TASKS", todolistId, tasks} as const)

//thunk
export const setTasksTC = (todolistId: string) =>
    (dispatch: Dispatch<ReturnType<typeof SetTasksAC>>) => {
    tasksApi.getTask(todolistId)
        .then(res => {
            dispatch(SetTasksAC(todolistId, res.data.items))
        })
}
export const addTasksTC = (newTitle: string, todolistId: string) =>
    (dispatch: Dispatch<ReturnType<typeof addTasksAC>>) => {
    tasksApi.createTask(newTitle, todolistId)
        .then(res => {
            dispatch(addTasksAC(res.data.data.item, todolistId))
        })
}
export const removeTasksTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch<ReturnType<typeof removeTasksAC>>) => {
    tasksApi.deleteTasks(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTasksAC(todolistId, taskId))
            }
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: ModelDomainTaskType) =>
    (dispatch: Dispatch<ReturnType<typeof updateTasksAC>>, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.task[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn("tasks not found")
        return;
    }
    const apiModel: ModelTaskUpdateType = {
        title: task.title,
        description: task.description,
        completed: task.completed,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    tasksApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTasksAC(todolistId, taskId, domainModel))
        })
}
