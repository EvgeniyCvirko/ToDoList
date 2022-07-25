import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import {EditableSpan} from "./components/EditableSpan";
import {AddItem} from "./components/AddItem";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTasksAC, setTasksTC, TaskStatues, TaskType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterAC, changeTitleAC, removeToDoAC, ToDOListDomainType} from "./state/todolists-reducer";
import {TasksForRender} from "./TasksForRender";

type TodoListPropsType = {
    id: string,
    toDoLists: ToDOListDomainType,
}

export const TodoListWithRedux =React.memo((props: TodoListPropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.task[props.id] )
    const dispatch = useDispatch()
    useEffect(() =>{
        // @ts-ignore
        dispatch(setTasksTC(props.id))
    },[])
    const changeFilterAllHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'all'))
    },[props.id])
    const changeFilterActiveHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'active'))
    },[props.id])
    const changeFilterCompleteHandler = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'complete'))
    },[props.id])
    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(changeTitleAC(props.id,title))
    },[])

    const removeTodoListHandler = useCallback( () => {
        dispatch(removeToDoAC(props.id))
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
        tasksForRender = tasks.filter(tl => tl.status === TaskStatues.New)
    }
    if (props.toDoLists.filter === 'complete') {
        tasksForRender = tasks.filter(tl => tl.status === TaskStatues.Completed)
    }
    const ulList = tasksForRender.length
        ? tasksForRender.map(el =>
            <TasksForRender id={el.id}
                            title={el.title}
                            status={el.status}
                            key={el.id}
                            todolistId={props.id}/>
            /*const changeTitleTask = (title: string) => {
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
           )*/
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

