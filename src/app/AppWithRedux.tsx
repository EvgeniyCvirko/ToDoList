import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistRedux} from "../todolists/TodolistRedux";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useAppSelector} from "../state/hooks";
import {Login} from "../components/Login";
import {Navigate, Route, Routes} from "react-router-dom";

export const AppWithRedux = () => {
    const status = useAppSelector(state => state.app.status)
    const isLogin = useAppSelector<boolean>(state => state.login.isAuth)
    /*if (!isLogin) {
        debugger
        return <Navigate to={'/login'}/>
    }*/
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
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistRedux/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    )
}

