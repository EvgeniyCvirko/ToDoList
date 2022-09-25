import React, {useCallback, useEffect} from 'react';
import s from '../Todolist.module.css'
import {EditableSpan} from "../../components/EditableSpan";
import {AddItem} from "../../components/AddItem";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { addTasksTC, setTasksTC, TaskStatues} from "../../state/tasks-reducer";
import {
    changeFilterAC,
    removeTodolistsTC,
    ToDOListDomainType, updateTodolistTitleTC
} from "../../state/todolists-reducer";
import {Tasks} from "./Tasks/Tasks";
import {useAppDispatch, useAppSelector} from "../../state/hooks";

type TodoListPropsType = {
    id: string,
    toDoLists: ToDOListDomainType,
}

export const TodoListForRender =React.memo((props: TodoListPropsType) => {

    const tasks = useAppSelector(state => state.task[props.id] )
    const dispatch = useAppDispatch()
    useEffect(() =>{
        dispatch(setTasksTC(props.id))
    },[])
    const changeFilterAllHandler = useCallback(() => {
        dispatch(changeFilterAC({TodoList_ID:props.id,newFilter: 'all'}))
    },[props.id])
    const changeFilterActiveHandler = useCallback(() => {
        dispatch(changeFilterAC({TodoList_ID:props.id,newFilter: 'active'}))
    },[props.id])
    const changeFilterCompleteHandler = useCallback(() => {
        dispatch(changeFilterAC({TodoList_ID:props.id,newFilter: 'complete'}))
    },[props.id])

    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC({todolistId: props.id, title}))
    },[])

    const removeTodoListHandler = useCallback( () => {
        dispatch(removeTodolistsTC({todolistId: props.id}))
    },[])

    const all = props.toDoLists.filter === 'all' ? s.activeFilter : '';
    const active = props.toDoLists.filter === 'active' ? s.activeFilter : '';
    const complete = props.toDoLists.filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button

    const addTask = useCallback((titleTask: string) => {
        dispatch(addTasksTC({newTitle: titleTask, todolistId: props.id}))
    }, [])

    let tasksForRender = tasks;
    if (props.toDoLists.filter === 'active') {
        tasksForRender = tasks.filter(tl => tl.status === TaskStatues.New)
    }
    if (props.toDoLists.filter === 'complete') {
        tasksForRender = tasks.filter(tl => tl.status === TaskStatues.Completed)
    }
    const ulList = tasksForRender.length
        ? tasksForRender.map(el =>
            <Tasks id={el.id}
                            title={el.title}
                            status={el.status}
                            key={el.id}
                            todolistId={props.id}/>
        )
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

