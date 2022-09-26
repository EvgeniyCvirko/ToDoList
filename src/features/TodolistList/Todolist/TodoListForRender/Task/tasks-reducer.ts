import {
    addTodolistsTC,
    fetchTodolistsTC, removeTodolistsTC,
    TodoListType,
} from "../../todolists-reducer";
import {ModelTaskUpdateType, tasksApi} from "../../../../../api/todolists-api";
import {AppRootStateType} from "../../../../../state/store";
import {appSetStatusAC} from "../../../../../state/App-reducer";
import {handelServerAppError, handelServerNetworkError} from "../../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
//thunk
export const setTasksTC = createAsyncThunk('tasks/setTasks', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.getTask(todolistId)
        thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
    } catch (err) {
        const error = err as AxiosError
            handelServerNetworkError(error?.message, thunkApi.dispatch)
        return thunkApi.rejectWithValue({error: error.message})
    } finally {
        thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
    }
})
export const removeTasksTC = createAsyncThunk('tasks/removeTasks', async (param: { todolistId: string, taskId: string }, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.deleteTasks(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            return {todolistId: param.todolistId, id: param.taskId}
        } else {
            handelServerAppError(res.data, thunkApi.dispatch)
        }
    } catch (err) {
        const error = err as  AxiosError
        handelServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue({error: error.message})
    } finally {
        thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
    }
})
export const addTasksTC = createAsyncThunk('tasks/addTasks', async (param: { newTitle: string, todolistId: string }, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.createTask(param.newTitle, param.todolistId)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item,todolistId: param.todolistId}
        } else {
            handelServerAppError(res.data, thunkApi.dispatch)
        }
    } catch (err) {
        const error = err as Error | AxiosError
        handelServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue({error: error.message})
    } finally {
        thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}))
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTasks', async (param: { todolistId: string, taskId: string, model: ModelDomainTaskType }, {dispatch, getState,rejectWithValue}) => {
    const state = getState() as AppRootStateType
        const task = state.task[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue('task is not found')
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
    dispatch(appSetStatusAC({status: 'loading'}))
    try {
        const res = await tasksApi.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}))
            return {todolistId:param.todolistId, taskId:param.taskId, model:param.model}
        } else {
            handelServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as Error | AxiosError
        handelServerNetworkError(error, dispatch)
        return rejectWithValue({error: error.message})
    } finally {
        dispatch(appSetStatusAC({status: 'succeeded'}))
    }
})

//state
const initialState: taskObjType = {}
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((e: TodoListType) => {
                state[e.id] = []
            })
        });
        builder.addCase(setTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(addTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistId].unshift(action.payload.task)
            }

        });
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                const task = state[action.payload.todolistId]
                const index = task.findIndex(ts => ts.id === action.payload?.id)
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

export const tasksReducer = slice.reducer

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