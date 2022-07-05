import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {taskObjType, TaskPriority, TaskStatues} from "./state/tasks-reducer";
import {FilterType, ToDOListDomainType} from "./state/todolists-reducer";

export const App = () => {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDOListDomainType>>([
        {id: toDoListID1, title: 'What to learn', filter:'all', addedDate: new Date(), order:0},
        {id: toDoListID2, title: 'What to buy', filter:'all',addedDate: new Date(), order:0},
    ])
    let [taskObj, setTask] = useState<taskObjType>({
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS",todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "JS", todoListId:toDoListID1, status:TaskStatues.Completed,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "ReactJS", todoListId:toDoListID1, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Redux", todoListId:toDoListID1, status:TaskStatues.Completed,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Beer", todoListId:toDoListID2, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Crisps", todoListId:toDoListID2, status:TaskStatues.New,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
            {id: v1(), title: "Fish", todoListId:toDoListID2, status:TaskStatues.Completed,priority: TaskPriority.Low,
                startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        ],
    })
    const changeFilter = (TodoList_ID: string, filter:FilterType) => {
        setToDoLists(toDoLists.map(e=> e.id === TodoList_ID ? {...e, filter} : e))
    }
    const addTask = (newTitle: string, toDoListId: string) => {
        let newTask = {id: v1(), title: newTitle,todoListId:toDoListId, status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false}
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = [newTask, ...task]
        setTask({...taskObj})
    }
    const addTodoList = (titleTodoList: string) => {
        const newTodoListID = v1();
        setToDoLists([...toDoLists,{ id: newTodoListID, title: titleTodoList, filter:'all',addedDate: new Date(), order:0}])
        setTask({...taskObj,[newTodoListID]: []})
    }
    const removeTask = (id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = task.filter(el => el.id !== id);
        setTask({...taskObj})
    }
    const removeTodoList = (toDoListId: string) =>{
        setToDoLists(toDoLists.filter( t => t.id!==toDoListId))
        delete taskObj[toDoListId]
    }
    const statusTask = (status: TaskStatues, id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = task.map(e => e.id === id ? {...e, status} : e);
        setTask({...taskObj})
    }
    const changeTitleTask = (TodoList_ID: string, id: string, title: string) => {
        setTask({...taskObj,
            [TodoList_ID] : taskObj[TodoList_ID].map(e=> e.id === id ? {...e, title} : e)})
    }
    const changeTitleTodoList = (TodoList_ID: string, title: string) => {
        setToDoLists(toDoLists.map(t=> t.id===TodoList_ID ? {...t, title} : t))
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
