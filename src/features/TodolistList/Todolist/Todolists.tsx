import {useActions, useAppDispatch, useAppSelector} from "../../../utils/hooks";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoListForRender} from "./TodoListForRender/TodoListForRender";
import {AddItem, AddItemFormSubmitHelperType} from "../../../components/AddItem";
import {Navigate} from "react-router-dom";
import {todolistActions} from "./index";
import {selectorIsLogin} from "../../Auth/index";

export const Todolists =() =>{
    const {fetchTodolistsTC} = useActions(todolistActions)
    const toDoLists = useAppSelector(state => state.todolist)
    const isLogin = useAppSelector(selectorIsLogin)
    const dispatch = useAppDispatch()

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todolistActions.addTodolistTC(title)
        const resultAction = await dispatch(thunk)

        if (todolistActions.addTodolistTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

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
                    todoList={tl}
                />
            </Paper>
        </Grid>
    })
    return(<>
            <Grid container style={{padding: "20px"}}>
                <AddItem
                    addItem={addTodolistCallback}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap:'nowrap', overflowX: 'scroll'}}>{todoListForRender}</Grid>
        </>
    )
}