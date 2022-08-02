import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistRedux} from "../todolists/TodolistRedux";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {Login} from "../components/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {setIsAuthTC} from "../state/App-reducer";

export const AppWithRedux = () => {
    console.log('render App')
    const status = useAppSelector(state => state.app.status)
    const isAuth = useAppSelector<boolean>(state => state.app.isAuth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setIsAuthTC())
    }, [])

    if (!isAuth) {

        return <CircularProgress/>
    }
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

