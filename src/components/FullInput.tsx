import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";


type FullInputPropsType={
    title:string,
    setTitle: (title:string) => void,
    addTask: (title: string) => void,
}

export const FullInput = (props:FullInputPropsType) =>{
    const [error, setError] = useState('')
    const addTask = () => {
        if (props.title.trim() !== '') {
            props.addTask(props.title.trim())
            props.setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    return(<div className={s.fullInput}>
            <input className={error ? s.error : ''} value={props.title} onKeyPress={onKeyHandler}
                   onChange={onChangeTitleHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}