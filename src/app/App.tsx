import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {Login} from "../components/Login";
import { Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {setIsAuthTC} from "./App-reducer";
import {setLogoutTC} from "../features/Auth/login-reducer";
import {Todolists} from "../features/TodolistList/Todolist/Todolists";
import {selectorIsLogin} from "../features/Auth/selectors";
import {selectorAppStatus, selectorIsInitialized} from "./index";

export const App = () => {
    const status = useAppSelector(selectorAppStatus)
    const isInitialized = useAppSelector(selectorIsInitialized)
    const isLogin =useAppSelector(selectorIsLogin)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setIsAuthTC())
    }, [isLogin])

    const logoutHandler = useCallback(() =>{
        dispatch(setLogoutTC())
    },[])
    if (!isInitialized) {
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
                        {isLogin && <Button onClick={logoutHandler} color='inherit'>Logout</Button>}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/*'} element={<Todolists/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    )
}

