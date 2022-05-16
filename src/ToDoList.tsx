import React, {FormEvent} from 'react';
import s from './Todolist.module.css'
import {TaskType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {AddItem} from "./components/AddItem";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

type TodoListPropsType = {
    title: string,
    filter: string
    id: string,
    task: Array<TaskType>,
    addTask: (title: string, toDoListId: string) => void,
    removeTask: (id: string, toDoListId: string) => void,
    removeTodoList: (toDoListId: string) => void,
    statusTask: (isDone: boolean, id: string, toDoListId: string) => void,
    changeFilter: (TodoList_ID: string, filter: string) => void
    changeTitleTodoList: (TodoList_ID: string, title: string) => void
    changeTitleTasks: (TodoList_ID: string, id: string, title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const changeFilterAllHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const changeFilterActiveHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const changeFilterCompleteHandler = () => {
        props.changeFilter(props.id, 'complete')
    }
    const changeTitleTodoList = (title: string) => {
        props.changeTitleTodoList(props.id, title)
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
    const all = props.filter === 'all' ? s.activeFilter : '';
    const active = props.filter === 'active' ? s.activeFilter : '';
    const complete = props.filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button
    const addTask = (titleTask: string) => {
        props.addTask(titleTask, props.id)
    }
    const ulList = props.task.length
        ? props.task.map(el => {
            const changeTitleTask = (title: string) => {
                props.changeTitleTasks(props.id, el.id, title)
            }
            return (

                <div key={el.id} className={el.isDone ? s.isDone : ''}>
                    <Checkbox checked={el.isDone}
                              onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, el.id, props.id)} />

                    <EditableSpan title={el.title}
                                  isDone={el.isDone}
                                  changeTitle={changeTitleTask}/>
                    <IconButton onClick={() => removeTaskHandler(el.id, props.id)}><Delete/></IconButton>
                </div>
            )
        })
        : <span>{'Нет в списке задач'}</span>

    return (
        <div>
            <div>
                <EditableSpan title={props.title}
                              changeTitle={changeTitleTodoList}/>
                <IconButton onClick={removeTodoListHandler}><Delete/></IconButton>
            </div>
            <AddItem
                addItem={addTask}/>
            <ul className={s.ul}>
                {ulList}
            </ul>
            <Button className={all} onClick={changeFilterAllHandler} variant='contained' color='default'>All</Button>
            <Button className={active} onClick={changeFilterActiveHandler} variant='contained'
                    color='primary'>Active</Button>
            <Button className={complete} onClick={changeFilterCompleteHandler} variant='contained'
                    color='secondary'>Complete</Button>
        </div>
    )
}