import {useActions,useAppSelector} from "../../../utils/hooks";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoListForRender} from "./TodoListForRender/TodoListForRender";
import {AddItem} from "../../../components/AddItem";
import {Navigate} from "react-router-dom";
import {todolistActions} from "./index";
import {selectorIsLogin} from "../../Auth/index";

export const Todolists =() =>{
    const {addTodolistsTC,fetchTodolistsTC} = useActions(todolistActions)
    const toDoLists = useAppSelector(state => state.todolist)
    const isLogin = useAppSelector(selectorIsLogin)

    const addTodoList = useCallback((titleTodoList: string) => {
        addTodolistsTC({title: titleTodoList})
    },[])
    useEffect(()=>{
        if(!isLogin) {
            return
        }
        fetchTodolistsTC();
    },[])
    if (!isLogin){
        return <Navigate to={'/login'}/>
    }
    const todoListForRender = toDoLists.map(tl => {
        return <Grid key={tl.id} item>
            <Paper  style={{padding: "10px", width: "300px"}}>
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