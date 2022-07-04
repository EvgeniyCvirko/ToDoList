import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'

}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '64057af6-0e83-4806-9023-16837f4ae3e0',
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings).then((res) => {
                        setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: 'Hello'}, settings).then((res) => {
            debugger
           if(res.data.resultCode ===0 ) {
               setState(res.data.data)
           }})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
