import axios from "axios";
import {CreateTodolist} from "../stories/todolists-api.stories";

type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number,
}
type CreateTodolistDataType = {
    item: TodoListType
}
type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}
type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

const instance = axios.create({
        withCredentials: true,
        headers: {
            "API-KEY": '64057af6-0e83-4806-9023-16837f4ae3e0',
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
    }
}