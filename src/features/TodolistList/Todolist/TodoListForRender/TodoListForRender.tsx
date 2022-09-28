import React, {useCallback, useEffect} from 'react';
import s from '../Style/Todolist.module.css'
import {EditableSpan} from "../../../../components/EditableSpan";
import {AddItem} from "../../../../components/AddItem";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatues} from "./Task/tasks-reducer";
import {
    FilterType,
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
    console.log('renderTodoListForRender')
    const tasks = useAppSelector(state => state.task[props.id] )
    const {updateTodolistTitleTC,removeTodolistsTC,changeFilterAC} = useActions(todolistActions)
    const {setTasksTC,addTasksTC} = useActions(tasksAction)

    useEffect(() =>{
        setTasksTC(props.id)
    },[])

    const changeTitleTodoList = useCallback((title: string) => {
        updateTodolistTitleTC({todolistId: props.id, title})
    },[]);

    const removeTodoListHandler =  () => {
        removeTodolistsTC({todolistId: props.id})
    }

    const addTask = useCallback((title: string) => {
        addTasksTC({title, todolistId: props.id})
    }, [addTasksTC,props.id])

    const buttonRender = (filterButton: FilterType, variant: 'text' | 'outlined' | 'contained', color: PropTypes.Color ) => {

        return (<Button className={filterButton} onClick={() => changeFilterAC({TodoList_ID: props.id, newFilter: filterButton})}
                       variant={props.toDoLists.filter === filterButton ? 'outlined' : 'text'} color={color}>{filterButton.toUpperCase()}</Button>)
    }

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
            {buttonRender('all', 'contained', 'default')}
            {buttonRender('active', 'contained', 'primary')}
            {buttonRender('complete', 'contained', 'secondary')}
        </div>
    )
})

