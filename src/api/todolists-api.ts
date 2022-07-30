import axios from "axios";
import {TodoListType} from "../state/todolists-reducer";
import {TaskType} from "../state/tasks-reducer";


type CreateTodolistDataType = {
    item: TodoListType
}

export type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}
type GetTaskType = {
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