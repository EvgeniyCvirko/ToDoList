import {useAppDispatch, useAppSelector} from "../state/hooks";
import React, {useCallback, useEffect} from "react";
import {addTodolistsTC, fetchTodolistsTC} from "../state/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {TodoListForRender} from "./TodoListForRender/TodoListForRender";
import {AddItem} from "../components/AddItem";
import {Navigate} from "react-router-dom";

export const TodolistRedux =() =>{
    const dispatch = useAppDispatch()
    const toDoLists = useAppSelector(state => state.todolist)
    const isLogin = useAppSelector(state => state.login.isLogin)
    const addTodoList = useCallback((titleTodoList: string) => {
        const action = addTodolistsTC(titleTodoList)
        dispatch(action)
    },[])
    useEffect(()=>{
        if(!isLogin) {
            return
        }
        dispatch(fetchTodolistsTC());
    },[])
    if (!isLogin){
        return <Navigate to={'/login'}/>
    }
    const todoListForRender = toDoLists.map(tl => {
        return <Grid key={tl.id} item>
            <Paper  style={{padding: "10px"}}>
                <TodoListForRender
                    id={tl.id}
                    toDoLists={tl}
                />
            </Paper>
        </Grid>
    })
    return(<>
            <Grid container style={{padding: "20px"}}>
                <AddItem
                    addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>{todoListForRender}</Grid>
        </>
    )
}