import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemType = {
    addItem: (title: string)=> void
}

export const AddItem = (props: AddItemType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        addItem()
    }
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error) setError(false)
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
   // const inputError = error ? s.error : ''
    return (<>
            <TextField variant='outlined'
                       error={error}
                       value={title}
                       helperText={error}
                       label='Title'
                       onKeyPress={onKeyHandler}
                       onChange={onChangeTitleHandler}/>
        <IconButton  color="primary" onClick={addItem} ><AddBox/></ IconButton>
            {error && <div className={s.errorMessage}>{'Title is required'}</div>}
        </>
    )
}