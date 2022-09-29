import {TaskType} from "../features/TodolistList/Todolist/TodoListForRender/Task/tasks-reducer";

export type FieldErrorType = { field: string; error: string }

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type CreateTodolistDataType = {
  item: TodolistType
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors?: Array<FieldErrorType>
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