import React from 'react';
import b from "../todolists/Todolist.module.css";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskStatues} from "../state/tasks-reducer";

type EditableSpanType = {
    title: string
    status?: TaskStatues
    changeTitle: (title: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>setTitle (e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()

    return (
        editMode ?
            <input autoFocus
                   onBlur={offEditMode}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={onEditMode} className={props.status === TaskStatues.Completed ? b.isDone : ''}>{props.title}</span>
    )
})
