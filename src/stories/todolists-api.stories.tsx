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
    const title = "new Name"
    useEffect(() => {
        toDoListsApi.createTodolist(title).then((res) =>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
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
    const todolistId = '8192acc9-219f-4161-b33d-b2f6c7997f37';
    const title = 'new Title 123';
    useEffect(() => {
        toDoListsApi.updateTodolist(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
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