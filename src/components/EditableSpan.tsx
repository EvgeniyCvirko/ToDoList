import React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskStatues} from "../features/TodolistList/Todolist/TodoListForRender/Task/tasks-reducer";

type EditableSpanType = {
    title: string
    status?: TaskStatues
    style?: string
    changeTitle: (title: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('render span')
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
            : <span style={{marginLeft: "15px", flexBasis: `${props.style ? '90%' : '80%'}  `, fontWeight: `${props.style}`}} onDoubleClick={onEditMode} >{props.title}</span>
    )
})
