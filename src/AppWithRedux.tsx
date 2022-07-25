import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItem} from "./components/AddItem";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoAC, fetchTodolistsTC,  ToDOListDomainType,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithRedux} from "./ToDoListWithRedux";


export type ToDOListType = {
    id: string
    title: string
    filter: string
}


export const AppWithRedux = () => {
    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootStateType, Array<ToDOListDomainType>>(state => state.todolist)

    const addTodoList = useCallback((titleTodoList: string) => {
        const action = addToDoAC(titleTodoList)
        dispatch(action)
    },[])

    useEffect(()=>{
        // @ts-ignore
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
