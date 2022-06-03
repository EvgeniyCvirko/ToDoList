import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoAC, changeFilterAC, changeTitleAC, removeToDoAC, todolistsReducer} from "./state/todolists-reducer";
import {addTasksAC, changeStatusTasksAC, changeTitleTasksAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type ToDOListType = {
    id: string
    title: string
    filter: string
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type TasksType={
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {

    const dispatch = useDispatch()
   const toDoLists = useSelector<AppRootStateType, Array<ToDOListType>>(state => state.todolist)
   const tasks = useSelector<AppRootStateType, TasksType>(state => state.task)



    const changeFilter = (TodoList_ID: string, filter:string) => {
        dispatch(changeFilterAC(TodoList_ID,filter))
    }
    const changeTitleTodoList = (TodoList_ID: string, title: string) => {
        dispatch(changeTitleAC(TodoList_ID,title))
    }
    const removeTodoList = (toDoListId: string) =>{
        dispatch(removeToDoAC(toDoListId))
    }
    const addTodoList = (titleTodoList: string) => {
        const action = addToDoAC(titleTodoList)
        dispatch(action)
    }
    const addTask = (newTitle: string, toDoListId: string) => {
        dispatch(addTasksAC(newTitle, toDoListId))
    }
    const removeTask = (id: string, toDoListId: string) => {
        dispatch(removeTasksAC(toDoListId,id))
    }
    const statusTask = (newIsDone: boolean, id: string, toDoListId: string) => {
        dispatch(changeStatusTasksAC(id,newIsDone,toDoListId))
    }
    const changeTitleTask = (TodoList_ID: string, id: string, title: string) => {
        dispatch(changeTitleTasksAC(TodoList_ID,id,title))
    }
    const todoListForRender = toDoLists.map(tl => {
        let tasksForRender = tasks[tl.id];
        if (tl.filter === 'active') {
            tasksForRender = tasks[tl.id].filter(tl => !tl.isDone)
        }
        if (tl.filter === 'complete') {
            tasksForRender = tasks[tl.id].filter(tl => tl.isDone)
        }
        return <Grid key={tl.id} item>
            <Paper  style={{padding: "10px"}}>
                <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    task={tasksForRender}
                    filter={tl.filter}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    addTask={addTask}
                    statusTask={statusTask}
                    changeTitleTasks={changeTitleTask}
                    changeTitleTodoList={changeTitleTodoList}
                    changeFilter={changeFilter}
                />
            </Paper>
        </Grid>
    })
    return (
        <div className='app'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" arial-lable="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>News
                    </Typography>
                    <Button color = 'inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItem
                    addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>{todoListForRender}</Grid>
            </Container>
        </div>
    )
}