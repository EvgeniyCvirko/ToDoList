import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";


type InputPropsType = {
    title: string,
    error: string,
    setTitle: (title: string) => void,
    setError: (title: string) => void,
    addTask: () => void,
}

export const Input = (props: InputPropsType) => {
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError('')
        if (e.key === 'Enter') {
            props.addTask()
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    return (<div>
            <input className={props.error ? s.error : ''} value={props.title} onKeyPress={onKeyHandler}
                   onChange={onChangeTitleHandler}/>
        </div>
    )
}