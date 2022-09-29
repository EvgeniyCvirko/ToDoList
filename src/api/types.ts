import {TodoListType} from "../features/TodolistList/Todolist/todolists-reducer";
import {TaskType} from "../features/TodolistList/Todolist/TodoListForRender/Task/tasks-reducer";

export type FieldErrorType = { field: string; error: string }

export type CreateTodolistDataType = {
  item: TodoListType
}

export type ResponseType<D = {}> = {
  resultCode: number,
  messages: Array<string>,
  data: D
}
export type GetTaskType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type ModelTaskUpdateType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
}