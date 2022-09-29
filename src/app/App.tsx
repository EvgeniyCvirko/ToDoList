import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useActions, useAppSelector} from "../utils/hooks";
import {Login} from "../components/Login";
import { Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {Todolists} from "../features/TodolistList/Todolist/Todolists";
import {loginActions, selectorIsLogin} from "../features/Auth/index";
import {appActions, selectorAppStatus, selectorIsInitialized} from "./index";

export const App = () => {
    const status = useAppSelector(selectorAppStatus)
    const isInitialized = useAppSelector(selectorIsInitialized)
    const isLogin =useAppSelector(selectorIsLogin)
    const {setIsInitializedTC} = useActions(appActions)
    const {setLogoutTC} = useActions(loginActions)

    useEffect(() => {
        setIsInitializedTC()
    }, [isLogin])

    const logoutHandler = useCallback(() =>{
        setLogoutTC()
    },[])
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
            <div className='app'>
                <ErrorSnackbar/>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" arial-lable="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6'>Todo Lists
                        </Typography>
                        {isLogin && <Button onClick={logoutHandler} color='inherit'>Logout</Button>}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed style={{maxWidth: '1500px'}}>
                    <Routes>
                        <Route path={'/*'} element={<Todolists/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
    )
}

