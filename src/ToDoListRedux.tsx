import React, {useCallback} from 'react';
import s from './Todolist.module.css'
import {EditableSpan} from "./components/EditableSpan";
import {AddItem} from "./components/AddItem";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
import {addTasksAC, changeStatusTasksAC, changeTitleTasksAC, removeTasksAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ToDOListType} from "./AppWithRedux";
import { changeFilterAC, changeTitleAC, removeToDoAC} from "./state/todolists-reducer";

type TodoListPropsType = {
    id: string,
    toDoLists: ToDOListType,
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const TodoListWithRedux =React.memo((props: TodoListPropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.task[props.id] )
    const dispatch = useDispatch()
    console.log('todolistRedux is called' + props.id)
    const changeFilterAllHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'all'))
    },[])
    const changeFilterActiveHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'active'))
    },[])
    const changeFilterCompleteHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'complete'))
    },[])
    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(changeTitleAC(props.id,title))
    },[])
    const removeTaskHandler = useCallback((newId: string, toDoListId: string) => {
        dispatch(removeTasksAC(toDoListId,newId))
    },[])
    const removeTodoListHandler = useCallback( () => {
        dispatch(removeToDoAC(props.id))
    },[])
    const onChangeIsDoneHandler = useCallback((newIsDone: boolean, newId: string, toDoListId: string) => {
        dispatch(changeStatusTasksAC(newId,newIsDone,toDoListId))
    },[])
    const all = props.toDoLists.filter === 'all' ? s.activeFilter : '';
    const active = props.toDoLists.filter === 'active' ? s.activeFilter : '';
    const complete = props.toDoLists.filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button
    const addTask = useCallback((titleTask: string) => {
        dispatch(addTasksAC(titleTask, props.id))
    }, [])
    let tasksForRender = tasks;
    if (props.toDoLists.filter === 'active') {
        tasksForRender = tasks.filter(tl => !tl.isDone)
    }
    if (props.toDoLists.filter === 'complete') {
        tasksForRender = tasks.filter(tl => tl.isDone)
    }
    const ulList = tasksForRender.length
        ? tasksForRender.map(el => {
            const changeTitleTask = (title: string) => {
                dispatch(changeTitleTasksAC(props.id,el.id,title))
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
                <EditableSpan title={props.toDoLists.title}
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
})

