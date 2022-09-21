import {
    addToDoAC,
    removeToDoAC,
    setTodolistsAC,
} from "./todolists-reducer";
import {ModelTaskUpdateType, tasksApi} from "../api/todolists-api";
import {AppRootStateType, AppThunk} from "./store";
import {appSetStatusAC} from "./App-reducer";
import {handelServerAppError, handelServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//state
const initialState: taskObjType = {}

export const setTasksTC = createAsyncThunk('tasks/setTasks',(todolistId: string, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    return tasksApi.getTask(todolistId)
        .then(res => {
            thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
            return {todolistId, tasks: res.data.items}
        })
        /*.catch((error) => {
            handelServerNetworkError(error, thunkApi.dispatch)
        })*/
} )
export const removeTasksTC = createAsyncThunk('tasks/removeTasks',(param: {todolistId: string, taskId: string},thunkApi) => {
    return tasksApi.deleteTasks(param.todolistId, param.taskId)
        .then(res => ({todolistId: param.todolistId, taskId: param.taskId}))
           /* if (res.data.resultCode === 0) {
                //thunkApi.dispatch(removeTasksAC({ todolistId: param.todolistId, id: param.taskId}))
                return { todolistId: param.todolistId, id: param.taskId}
            } else {
                handelServerAppError(res.data, thunkApi.dispatch)
            }*/
        //})
        /*.catch(error => {
            handelServerNetworkError(error, thunkApi.dispatch)
        })*/
} )


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        updateTasksAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: ModelDomainTaskType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(ts => ts.id === action.payload.taskId)
            if(index > - 1){
            tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        addTasksAC(state, action: PayloadAction<{ task: TaskType, todolistId: string }>) {
            state[action.payload.todolistId].unshift(action.payload.task)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addToDoAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeToDoAC,(state, action)=>{
          delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC,(state, action)=>{
            action.payload.todolists.forEach((e: any) => {
                state[e.id] = []
            })
        });
        builder.addCase(setTasksTC.fulfilled,(state, action)=>{
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTasksTC.fulfilled,(state, action)=>{
            const task = state[action.payload.todolistId]
            const index = task.findIndex(ts => ts.id === action.payload.taskId)
            if (index > -1) {
                task.splice(index,1)
            }
        });
    }
})
export const tasksReducer = slice.reducer

//thunk

export const addTasksTC = (newTitle: string, todolistId: string): AppThunk => {
    return dispatch => {
        dispatch(appSetStatusAC({status: 'loading'}))
        tasksApi.createTask(newTitle, todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTasksAC({task: res.data.data.item, todolistId}))
                    dispatch(appSetStatusAC({status: 'succeeded'}))
                } else {
                    handelServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handelServerNetworkError(error, dispatch)
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: ModelDomainTaskType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.task[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task is not found')
            return
        }
        const apiModel: ModelTaskUpdateType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model,
        }
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTasksAC({ todolistId, taskId, model}))
                } else {
                    handelServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handelServerNetworkError(error, dispatch)
            })
    }
}
//types
export const {updateTasksAC, addTasksAC} = slice.actions
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

export type ModelDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}