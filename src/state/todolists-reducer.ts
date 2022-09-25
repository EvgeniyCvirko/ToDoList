import {toDoListsApi} from "../api/todolists-api";
import {appSetStatusAC} from "./App-reducer";
import {handelServerAppError, handelServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
//thunk
export const fetchTodolistsTC = createAsyncThunk('todolist/fetch', async (param, {rejectWithValue, dispatch}) => {
  dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await toDoListsApi.getTodolists()
    return {todolists: res.data}

  } catch (err) {
    const error = err as AxiosError
    handelServerNetworkError(error, dispatch)
    return rejectWithValue({error: error.message})
  } finally {
    dispatch(appSetStatusAC({status: 'succeeded'}))
  }
})

export const removeTodolistsTC = createAsyncThunk('todolist/remove', async (param: { todolistId: string }, {dispatch, rejectWithValue}) => {
  dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await toDoListsApi.deleteTodolist(param.todolistId)
    if (res.data.resultCode === 0) {
      return {todolistId: param.todolistId}
    } else {
      handelServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    const error = err as AxiosError
    handelServerNetworkError(error, dispatch)
    return rejectWithValue({error: error.message})
  } finally {
    dispatch(appSetStatusAC({status: 'succeeded'}))
  }
})

export const addTodolistsTC = createAsyncThunk('todolist/add', async (param:{title: string}, {rejectWithValue, dispatch}) => {
  dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await toDoListsApi.createTodolist(param.title)

    if (res.data.resultCode === 0) {
      return {todolist: res.data.data.item}
         } else {
           handelServerAppError(res.data, dispatch)
      return rejectWithValue(null)
         }
  } catch (err) {
    const error = err as AxiosError
    handelServerNetworkError(error, dispatch)
    return rejectWithValue({error: error.message})
  } finally {
    dispatch(appSetStatusAC({status: 'succeeded'}))
  }
})

export const updateTodolistTitleTC = createAsyncThunk('todolist/update', async (param:{todolistId: string, title: string}, {rejectWithValue, dispatch}) => {  dispatch(appSetStatusAC({status: 'loading'}))
  try {
    const res = await toDoListsApi.updateTodolist(param.todolistId, param.title)
      return {todolistId: param.todolistId, title: param.title}

  } catch (err) {
    const error = err as AxiosError
    handelServerNetworkError(error, dispatch)
    return rejectWithValue({error: error.message})
  } finally {
    dispatch(appSetStatusAC({status: 'succeeded'}))
  }
})
//state
const slice = createSlice({
  name: 'todolist',
  initialState: [] as ToDOListDomainType[],
  reducers: {
    changeFilterAC(state, action: PayloadAction<{ TodoList_ID: string, newFilter: FilterType }>) {
      const index = state.findIndex(el => el.id === action.payload.TodoList_ID)
      state[index].filter = action.payload.newFilter
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(e => ({...e, filter: 'all'}))
    });
    builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
         if (index > -1) {
           state.splice(index, 1)
         }
    });
    builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
       state.unshift({...action.payload.todolist, filter: 'all'})
    });
    builder.addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      state[index].title = action.payload.title
    });
  }
})
export const todolistsReducer = slice.reducer
//types
export const {changeFilterAC} = slice.actions
export type ToDOListDomainType = TodoListType & {
  filter: FilterType
}
export type  FilterType = 'all' | 'active' | 'complete'
export type TodoListType = {
  id: string,
  title: string,
  addedDate: Date,
  order: number,
}