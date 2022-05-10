import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";
import {Button} from "./components/Button";
import {TaskType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {AddItem} from "./components/AddItem";

type TodoListPropsType = {
    task: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    removeTodoList: (toDoListId: string) => void,
    addTask: (title: string, toDoListId: string) => void,
    statusTask: (isDone: boolean, id: string, toDoListId: string) => void,
    title: string,
    id: string,
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
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const onChangeIsDoneHandler = (newIsDone: boolean, newId: string, toDoListId: string) => {
        props.statusTask(newIsDone, newId, toDoListId)
    }

    const all = filter === 'all' ? s.activeFilter : '';
    const active = filter === 'active' ? s.activeFilter : '';
    const complete = filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button
    const addTask = (titleTask: string) => {
        props.addTask(titleTask, props.id)
    }
    const ulList = tasks.length
    ? tasks.map(el=>{
        return(
            <li key={el.id} className={el.isDone ? s.isDone : ''}>
                <input type='checkbox' checked={el.isDone}
                       onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, el.id, props.id)}/>
                <EditableSpan title={el.title}/>
                <button onClick={() => removeTaskHandler(el.id, props.id)}>x</button>
            </li>
        )
        })
        : <span>{'Нет в списке задач'}</span>

    return (
        <div>
            <h2>{props.title}
            <button onClick={removeTodoListHandler}>x</button>
            </h2>
            <AddItem
                addItem={addTask}/>
            <ul className={s.ul}>
                {ulList}
            </ul>
            <button className={all} onClick={changeFilterAllHandler}>All</button>
            <button className={active} onClick={changeFilterActiveHandler}>Active</button>
            <button className={complete} onClick={changeFilterCompleteHandler}>Complete</button>
        </div>
    )
}