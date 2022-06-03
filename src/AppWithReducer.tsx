import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoAC, changeFilterAC, changeTitleAC, removeToDoAC, todolistsReducer} from "./state/todolists-reducer";
import {addTasksAC, changeStatusTasksAC, changeTitleTasksAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";

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
export type taskObjType={
    [key: string]: TaskType[]
}


export const AppWithReducer = () => {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const [toDoLists, dispatchToDoLists] = useReducer( todolistsReducer ,[
        {id: toDoListID1, title: 'What to learn', filter:'all'},
        {id: toDoListID2, title: 'What to buy', filter:'all'},
    ])

    let [taskObj, dispatchToTask] = useReducer( tasksReducer,{
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Crisps", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
        ],
    })

    const changeFilter = (TodoList_ID: string, filter:string) => {
        dispatchToDoLists(changeFilterAC(TodoList_ID,filter))
    }
    const changeTitleTodoList = (TodoList_ID: string, title: string) => {
        dispatchToDoLists(changeTitleAC(TodoList_ID,title))
    }
    const removeTodoList = (toDoListId: string) =>{
        dispatchToDoLists(removeToDoAC(toDoListId))
    }

    const addTodoList = (titleTodoList: string) => {

        const action = addToDoAC(titleTodoList)
        dispatchToDoLists(action)
        dispatchToTask(action)
    }
    const addTask = (newTitle: string, toDoListId: string) => {
        dispatchToTask(addTasksAC(newTitle, toDoListId))
    }

    const removeTask = (id: string, toDoListId: string) => {
        dispatchToTask(removeTasksAC(toDoListId,id))
    }
    const statusTask = (newIsDone: boolean, id: string, toDoListId: string) => {
        dispatchToTask(changeStatusTasksAC(id,newIsDone,toDoListId))
    }
    const changeTitleTask = (TodoList_ID: string, id: string, title: string) => {
        dispatchToTask(changeTitleTasksAC(TodoList_ID,id,title))
    }

    const todoListForRender = toDoLists.map(tl => {
        let tasksForRender = taskObj[tl.id];
        if (tl.filter === 'active') {
            tasksForRender = taskObj[tl.id].filter(tl => !tl.isDone)
        }
        if (tl.filter === 'complete') {
            tasksForRender = taskObj[tl.id].filter(tl => tl.isDone)
        }
        return <Grid item>
            <Paper style={{padding: "10px"}}>
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