import React, {useEffect, useState} from 'react'
import {tasksApi, todoListsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todoListsApi.getTodolists().then((res) => {
           setState(res.data)
       })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createHandler = () => {
        todoListsApi.createTodolist(title).then((res) =>{
            setState(res.data)
        })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='titleTDList' onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title} />
        </div>
        <div>
            <button onClick={createHandler}>createTDList</button>
        </div>

    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolistHandler = () =>{
        todoListsApi.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId} />
        </div>
        <div>
            <button onClick={deleteTodolistHandler}>deletTodolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const changeTitleHandler = () => {
        todoListsApi.updateTodolist(todolistId, title).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='titleTDList' onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title} />
        </div>
        <div>
            <input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId} />
        </div>
        <div>
            <button onClick={changeTitleHandler}>changeTitle</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTaskHandler = () => {
        tasksApi.getTasks(todolistId).then((res) => {
            setState(res.data.items)
        })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId} />
        </div>
        <div>
            <button onClick={getTaskHandler}>get Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTaskHandler = () =>{
        tasksApi.deleteTask (todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div><input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId}/></div>
        <div><input placeholder='taskId' onChange={(e)=>{setTaskId(e.currentTarget.value)}} value={taskId}/></div>
        <div>
            <button onClick={deleteTaskHandler}>delete Task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const deleteTaskHandler = () =>{
        tasksApi.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div><input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId}/></div>
        <div><input placeholder='title' onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title}/></div>
        <div>
            <button onClick={deleteTaskHandler}>createTask</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)

    const model ={title,description,completed,status, priority,
        startDate: new Date,
        deadline: new Date,
    }
    const updateTaskHandler = () =>{
        tasksApi.updateTask(todolistId, taskId, model ).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div><input placeholder='todolistId' onChange={(e)=>{setTodolistId(e.currentTarget.value)}} value={todolistId}/></div>
        <div><input placeholder='title' onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title}/></div>
        <div><input placeholder='description' onChange={(e)=>{setDescription(e.currentTarget.value)}} value={description}/></div>
        <div><input type='checkbox' onChange={(e)=>{setCompleted(e.currentTarget.checked)}}/></div>
        <div><input placeholder='status'  onChange={(e)=>{setStatus(+e.currentTarget.value)}} value={status}/></div>
        <div><input placeholder='priority' onChange={(e)=>{setPriority(+e.currentTarget.value)}} value={priority}/></div>
        <div><input placeholder='taskId' onChange={(e)=>{setTaskId(e.currentTarget.value)}} value={taskId}/></div>
        <div>
            <button onClick={updateTaskHandler}>updateTask</button>
        </div>
    </div>
}