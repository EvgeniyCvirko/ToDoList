import axios from "axios";
import {TodoListType} from "../features/TodolistList/Todolist/todolists-reducer";
import {TaskType} from "../features/TodolistList/Todolist/TodoListForRender/Task/tasks-reducer";
import {LoginStateType} from "../features/Auth/login-reducer";
import {CreateTodolistDataType, GetTaskType, ModelTaskUpdateType, ResponseType} from "./types";

const instance = axios.create({
        withCredentials: true,
        headers: {
            "API-KEY": 'adcfde77-24ec-4f29-9821-c3a1b9dacd02',
        },
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    }
)
export const toDoListsApi = {
    getTodolists() {
        return instance.get<TodoListType[]>("/todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<CreateTodolistDataType>>("/todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },
}
export const tasksApi = {
    getTask(todolistId: string) {
        return instance.get<GetTaskType>(`/todo-lists/${todolistId}/tasks`,)
    },
    deleteTasks(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask( title: string, todolistId: string){
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId: string, taskId: string, model: ModelTaskUpdateType){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...model})
    }
}
export const loginApi ={
    getAuth(){
        return instance.get('/auth/me')
},
    createLogin(loginState: LoginStateType){
        return instance.post<ResponseType<{userId?: string}>>('/auth/login', loginState)
    },
    deleteLogin(){
        return instance.delete<ResponseType>('/auth/login')
    }
}