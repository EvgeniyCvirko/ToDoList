import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistRedux} from "../todolists/TodolistRedux";

export const AppWithRedux = () => {
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
                <TodolistRedux/>
            </Container>
        </div>
    )
}

