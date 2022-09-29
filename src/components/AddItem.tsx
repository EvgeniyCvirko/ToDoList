import React, {ChangeEvent, KeyboardEvent,useState} from 'react';
import s from "../features/TodolistList/Todolist/Style/Todolist.module.css";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}
type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItem =React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    console.log('render add')
    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (<div>
            <TextField variant='outlined'
                       error={!!error}
                       value={title}
                       helperText={error}
                       label='Title'
                       onKeyPress={onKeyHandler}
                       onChange={onChangeTitleHandler}/>
        <IconButton  color="primary" onClick={addItemHandler} disabled={disabled} ><AddBox/></ IconButton>
            {error && <div className={s.errorMessage}>{'Title is required'}</div>}
        </div>
    )
})