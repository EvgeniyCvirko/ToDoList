import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusTasksAC, changeTitleTasksAC, removeTasksAC} from "./state/tasks-reducer";
import s from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";

type TasksForRenderType = {
    todolistId: string
    id: string,
    title: string,
    isDone: boolean,
}
export const TasksForRender = React.memo((props: TasksForRenderType) => {
    const dispatch = useDispatch()
    const changeTitleTask = (title: string) => {
        dispatch(changeTitleTasksAC(props.todolistId, props.id, title))
    }
    const onChangeIsDoneHandler = useCallback((newIsDone: boolean, newId: string, toDoListId: string) => {
        dispatch(changeStatusTasksAC(newId, newIsDone, toDoListId))
    }, [])
    const removeTaskHandler = useCallback((newId: string, toDoListId: string) => {
        dispatch(removeTasksAC(toDoListId, newId))
    }, [])
    return (
        <div key={props.id} className={props.isDone ? s.isDone : ''}>
            <Checkbox checked={props.isDone}
                      onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, props.id, props.todolistId)}/>
            <EditableSpan title={props.title}
                          isDone={props.isDone}
                          changeTitle={changeTitleTask}/>
            <IconButton onClick={() => removeTaskHandler(props.id, props.todolistId)}><Delete/></IconButton>
        </div>
    )
})