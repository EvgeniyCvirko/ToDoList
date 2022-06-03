/*
import React from 'react';

type EditableSpanType = {
    title: string
}

export const EditableSpan = (props: EditableSpanType) => {


    return (<span> {props.title} </span>
    )
}*/
import b from "./../Todolist.module.css";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanType = {
    title: string
    isDone?: boolean
    changeTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {

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
            : <span onDoubleClick={onEditMode} className={props.isDone ? b.isDone : ''}>{props.title}</span>
    )
}
