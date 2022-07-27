import React, {useCallback} from "react";
import {
    removeTasksTC,
    TaskStatues, updateTaskTC
} from "../../../state/tasks-reducer";
import s from "../../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useAppDispatch} from "../../../state/hooks";

type TasksType = {
    todolistId: string
    id: string,
    title: string,
    status: TaskStatues,
}
export const Tasks = React.memo((props: TasksType) => {
    const dispatch = useAppDispatch()
    const changeTitleTask = useCallback((title: string) => {
        dispatch(updateTaskTC(props.todolistId, props.id, {title} ))
    },[])

    const onChangeIsDoneHandler = useCallback((isDone: boolean, newId: string, toDoListId: string) => {
        let status
        isDone ? status = 2 : status = 0;
        dispatch(updateTaskTC(toDoListId, newId, {status} ))
    }, [])

    const removeTaskHandler = useCallback((newId: string, toDoListId: string) => {
        dispatch(removeTasksTC(toDoListId, newId))
    }, [])

    return (
        <div key={props.id} className={props.status === TaskStatues.Completed  ? s.isDone : ''}>
            <Checkbox checked={props.status === TaskStatues.Completed}
                      onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, props.id, props.todolistId)}/>
            <EditableSpan title={props.title}
                          status={props.status}
                          changeTitle={changeTitleTask}/>
            <IconButton onClick={() => removeTaskHandler(props.id, props.todolistId)}><Delete/></IconButton>
        </div>
    )
})