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
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: 'the 6th'}, settings).then((res) => {
           if(res.data.resultCode ===0 ) {
               setState(res.data)
           }})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/9504381b-608f-4979-9c3e-3fcef569678b`, settings).then((res) => {
            setState(res.data)   })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '9300ffd3-3f51-4ba7-98f3-a2a9c5c2353b'
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title: 'the 8th'}, settings).then((res) => {
            setState(res.data)   })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
