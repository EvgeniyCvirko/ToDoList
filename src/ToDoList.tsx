import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";
import {Button} from "./components/Button";

type TodoListPropsType = {
    task: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    addTask: (title: string, toDoListId: string) => void,
    statusTask: (isDone: boolean, id: string, toDoListId: string) => void,
    title: string,
    id: string,
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [filter, setFilter] = useState<string>('all')

    let tasks = props.task;
    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'complete') {
        tasks = tasks.filter(el => el.isDone)
    }
    const changeFilterAllHandler = () => {
        setFilter('all')
    }
    const changeFilterActiveHandler = () => {
        setFilter('active')
    }
    const changeFilterCompleteHandler = () => {
        setFilter('complete')
    }

    const removeTaskHandler = (newId: string, toDoListId: string) => {
        props.removeTask(newId, toDoListId)
    }
    const onChangeIsDoneHandler = (newIsDone: boolean, newId: string, toDoListId: string) => {
        props.statusTask(newIsDone, newId, toDoListId)
    }

    const all = filter === 'all' ? s.activeFilter : '';
    const active = filter === 'active' ? s.activeFilter : '';
    const complete = filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button
    const [error, setError] = useState('')
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <h2>{props.title}</h2>
           {/* <FullInput title={title}
                       id={props.id}
                       setTitle={setTitle}
                       addTask={props.addTask}
            />*/}
              <div className={s.fullInput}>
                <Input title={title}
                      setTitle={setTitle}
                      addTask={addTask}
                      error={error}
                      setError={setError}
            />
                <Button name='+' callBack={addTask}/>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul className={s.ul}>
                {tasks.map(el => {
                    return (
                        <li key={el.id} className={el.isDone ? s.isDone : ''}>
                            <input type='checkbox' checked={el.isDone}
                                   onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, el.id, props.id)}/>
                            <span>{el.title} </span>
                            <button onClick={() => removeTaskHandler(el.id, props.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <button className={all} onClick={changeFilterAllHandler}>All</button>
            <button className={active} onClick={changeFilterActiveHandler}>Active</button>
            <button className={complete} onClick={changeFilterCompleteHandler}>Complete</button>
        </div>
    )
}