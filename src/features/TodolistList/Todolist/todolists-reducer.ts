import {todoListsApi} from "../../../api/todolists-api";
import {appSetStatusAC, StatusType} from "../../../app/App-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ThunkError} from "../../../utils/types";
import {TodolistType} from "../../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../utils/error-utils";
//thunk
export const fetchTodolistsTC = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>('todolist/fetch', async (param, thunkAPI) => {
  thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await todoListsApi.getTodolists()
    return {todolists: res.data}
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
  }
})
export const removeTodolistTC = createAsyncThunk<{ id: string }, string, ThunkError>('todolist/remove', async (todolistId, thunkAPI) => {
  thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await todoListsApi.deleteTodolist(todolistId)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
      return {id: todolistId}
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    }
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
  }
})
export const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>('todolist/add',
  async (title, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
    try {
      const res = await todoListsApi.createTodolist(title)
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
      } else {
        return handleAsyncServerAppError(res.data, thunkAPI, false)
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
      }
    }
})
export const updateTodolistTitleTC = createAsyncThunk('todolist/update',
  async (param:{todolistId: string, title: string}, thunkAPI) => {
    thunkAPI.dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await todoListsApi.updateTodolist(param.todolistId, param.title)
    if(res.data.resultCode === 0){
      thunkAPI.dispatch(appSetStatusAC({status: 'succeeded'}))
      return param
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
  }
})
//state
export const slice = createSlice({
  name: 'todolist',
  initialState: [] as TodoListDomainType[],
  reducers: {
    changeFilterAC(state, action: PayloadAction<{ TodoList_ID: string, newFilter: FilterType }>) {
      const index = state.findIndex(el => el.id === action.payload.TodoList_ID)
      state[index].filter = action.payload.newFilter
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(e => ({...e, filter: 'all',entityStatus: 'idle'}))
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex(el => el.id === action.payload.id)
         if (index > -1) {
           state.splice(index, 1)
         }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
       state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    });
    builder.addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      state[index].title = action.payload.title
    });
  }
})
//action
export const asyncAction = {fetchTodolistsTC, removeTodolistTC,addTodolistTC, updateTodolistTitleTC }
export const {changeFilterAC} = slice.actions
//types
export type TodoListDomainType = TodolistType & {
  filter: FilterType
  entityStatus: StatusType
}
export type  FilterType = 'all' | 'active' | 'completed'