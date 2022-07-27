import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "../todolists/ToDoList";
import {v1} from "uuid";
import {AddItem} from "../components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeFilterAC,
    changeTitleAC, FilterType,
    removeToDoAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {
    removeTasksAC, TaskPriority,
    tasksReducer,
    TaskStatues
} from "../state/tasks-reducer";

export const AppWithReducer = () => {
    let toDoListID1 = v1();
    let toDoListID2 = v1();
    const [toDoLists, dispatchToDoLists] = useReducer( todolistsReducer ,[
        {id: toDoListID1, title: 'What to learn', filter:'all', addedDate: new Date(), order:0},
        {id: toDoListID2, title: 'What to buy', filter:'all',addedDate: new Date(), order:0},
    ])

    let [taskObj, dispatchToTask] = useReducer( tasksReducer,{
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS",todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "JS", todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "ReactJS", todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Redux", todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Beer", todoListId:toDoListID2, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Crisps", todoListId:toDoListID2, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Fish", todoListId:toDoListID2, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        ],
    })

    const changeFilter = (TodoList_ID: string, filter:FilterType) => {
        dispatchToDoLists(changeFilterAC(TodoList_ID,filter))
    }
    const changeTitleTodoList = (TodoList_ID: string, title: string) => {
        dispatchToDoLists(changeTitleAC(TodoList_ID,title))
    }
    const removeTodoList = (toDoListId: string) =>{
        dispatchToDoLists(removeToDoAC(toDoListId))
    }

    const addTodoList = (titleTodoList: string) => {

        // const action = addToDoAC(titleTodoList)
        // dispatchToDoLists(action)
        // dispatchToTask(action)
    }
    const addTask = (newTitle: string, toDoListId: string) => {
        // dispatchToTask(addTasksAC(newTitle, toDoListId))
    }

    const removeTask = (id: string, toDoListId: string) => {
        dispatchToTask(removeTasksAC(toDoListId,id))
    }
    const statusTask = (status: TaskStatues, id: string, toDoListId: string) => {
        // dispatchToTask(changeStatusTasksAC(id,status,toDoListId))
    }
    const changeTitleTask = (TodoList_ID: string, id: string, title: string) => {
        // dispatchToTask(changeTitleTasksAC(TodoList_ID,id,title))
    }

    const todoListForRender = toDoLists.map(tl => {
        let tasksForRender = taskObj[tl.id];
        if (tl.filter === 'active') {
            tasksForRender = taskObj[tl.id].filter(tl => tl.status === TaskStatues.New)
        }
        if (tl.filter === 'complete') {
            tasksForRender = taskObj[tl.id].filter(tl => tl.status === TaskStatues.Completed)
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
