import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItem} from "./components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoAC, addTodolistsTC, fetchTodolistsTC} from "./state/todolists-reducer";
import {TodoListWithRedux} from "./ToDoListWithRedux";
import {useAppDispatch, useAppSelector} from "./state/hooks";


export type ToDOListType = {
    id: string
    title: string
    filter: string
}


export const AppWithRedux = () => {
    const dispatch = useAppDispatch()
    const toDoLists = useAppSelector(state => state.todolist)

    const addTodoList = useCallback((titleTodoList: string) => {
        const action = addTodolistsTC(titleTodoList)
        dispatch(action)
    },[])

    useEffect(()=>{
        dispatch(fetchTodolistsTC());
    },[])

    const todoListForRender = toDoLists.map(tl => {
        return <Grid key={tl.id} item>
            <Paper  style={{padding: "10px"}}>
                <TodoListWithRedux
                    id={tl.id}
                    toDoLists={tl}
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
