import React, {useEffect, useState} from 'react'
import {tasksApi, toDoListsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       toDoListsApi.getTodolists().then((res) => {
           setState(res.data)
       })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createHandler = () => {
        toDoListsApi.createTodolist(title).then((res) =>{
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
        toDoListsApi.deleteTodolist(todolistId).then((res) => {
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
        toDoListsApi.updateTodolist(todolistId, title).then((res) => {
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
        tasksApi.getTask(todolistId).then((res) => {
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
        tasksApi.deleteTasks (todolistId, taskId).then((res) => {
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