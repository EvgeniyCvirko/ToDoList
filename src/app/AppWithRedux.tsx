import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistRedux} from "../todolists/TodolistRedux";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useAppSelector} from "../state/hooks";
import {StatusType} from "../state/App-reducer";

export const AppWithRedux = () => {
    const status = useAppSelector(state => state.app.status)
    return (
        <div className='app'>
            <ErrorSnackbar/>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" arial-lable="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>News
                    </Typography>
                    <Button color = 'inherit'>Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistRedux/>
            </Container>
        </div>
    )
}

