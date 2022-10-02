import {
    addTodolistTC,
    fetchTodolistsTC, removeTodolistTC,
} from "../../todolists-reducer";
import {tasksApi} from "../../../../../api/todolists-api";
import {appSetStatusAC} from "../../../../../app/App-reducer";
import {
    handleAsyncServerAppError, handleAsyncServerNetworkError
} from "../../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AppRootStateType, ThunkError} from "../../../../../utils/types";
import {ModelTaskUpdateType, TodolistType} from "../../../../../api/types";
//thunk
export const getTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/setTasks', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.getTasks(todolistId)
        const tasks = res.data.items
        thunkApi.dispatch( appSetStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleAsyncServerNetworkError(error, thunkApi)
        }
    }
})
export const removeTasksTC = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTasks',
  async (param, thunkApi) => {
    // thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    // try {
    //     const res = await tasksApi.deleteTask(param.todolistId, param.taskId)
    //     if (res.data.resultCode === 0) {
    //         return {todolistId: param.todolistId, id: param.taskId}
    //     } else {
    //         handelServerAppError(res.data, thunkApi.dispatch)
    //     }
    // } catch (err) {
    //     const error = err as  AxiosError
    //     handelServerNetworkError(error, thunkApi.dispatch)
    //     return thunkApi.rejectWithValue({error: error.message})
    // } finally {
    //     thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
    // }
    const res = await tasksApi.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})
export const addTasksTC = createAsyncThunk<TaskType, { todolistId: string,title: string  }, ThunkError>('tasks/addTasks',
  async (param, thunkAPI) => {
      thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
      try {
          const res = await tasksApi.createTask(param.todolistId, param.title)
          if (res.data.resultCode === 0) {
              thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
              return res.data.data.item
          } else {
              handleAsyncServerAppError(res.data, thunkAPI, false)
              return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
          }
      } catch (error) {
          if (axios.isAxiosError(error)) {
              return handleAsyncServerNetworkError(error, thunkAPI, false)
          }

      }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTasks', async (param: { todolistId: string, taskId: string, model: ModelDomainTaskType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
        const task = state.task[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task is not found')
        }
        const apiModel: ModelTaskUpdateType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.model,
        }
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    }
})
//state
const initialState: taskObjType = {}
export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((e: TodolistType) => {
                state[e.id] = []
            })
        });
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(addTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId].unshift(action.payload)
            }
        });
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                const task = state[action.payload.todolistId]
                const index = task.findIndex(ts => ts.id === action.payload.taskId)
                if (index > -1) {
                    task.splice(index, 1)
                }
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(ts => ts.id === action.payload.taskId)
            if(index > - 1){
                tasks[index] = {...tasks[index], ...action.payload.model}
            }

        });
    },
    })
//action
export const asyncActions = {
    setTasksTC: getTasksTC, removeTasksTC, addTasksTC, updateTaskTC
}
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
export type ModelDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}