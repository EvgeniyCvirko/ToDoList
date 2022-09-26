import React, {useCallback, useEffect} from 'react';
import s from '../Style/Todolist.module.css'
import {EditableSpan} from "../../../../components/EditableSpan";
import {AddItem} from "../../../../components/AddItem";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatues} from "./Task/tasks-reducer";
import {
    ToDOListDomainType
} from "../todolists-reducer";
import {Tasks} from "./Task/Tasks";
import {useActions, useAppSelector} from "../../../../utils/hooks";
import {todolistActions} from "../index";
import {tasksAction} from "./Task";

type TodoListPropsType = {
    id: string,
    toDoLists: ToDOListDomainType,
}

export const TodoListForRender =React.memo((props: TodoListPropsType) => {

    const tasks = useAppSelector(state => state.task[props.id] )
    const {updateTodolistTitleTC,removeTodolistsTC,changeFilterAC} = useActions(todolistActions)
    const {setTasksTC,addTasksTC} = useActions(tasksAction)
    useEffect(() =>{
        setTasksTC(props.id)
    },[])
    const changeFilterAllHandler = useCallback(() => {
        changeFilterAC({TodoList_ID:props.id,newFilter: 'all'})
    },[props.id])
    const changeFilterActiveHandler = useCallback(() => {
        changeFilterAC({TodoList_ID:props.id,newFilter: 'active'})
    },[props.id])
    const changeFilterCompleteHandler = useCallback(() => {
        changeFilterAC({TodoList_ID:props.id,newFilter: 'complete'})
    },[props.id])

    const changeTitleTodoList = useCallback((title: string) => {
        updateTodolistTitleTC({todolistId: props.id, title})
    },[])

    const removeTodoListHandler = useCallback( () => {
        removeTodolistsTC({todolistId: props.id})
    },[])

    const all = props.toDoLists.filter === 'all' ? s.activeFilter : '';
    const active = props.toDoLists.filter === 'active' ? s.activeFilter : '';
    const complete = props.toDoLists.filter === 'complete' ? s.activeFilter : '';
    // Для Input и Button

    const addTask = useCallback((titleTask: string) => {
        addTasksTC({newTitle: titleTask, todolistId: props.id})
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

