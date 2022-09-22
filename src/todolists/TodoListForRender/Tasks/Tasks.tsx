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

type TasksForRenderType = {
    todolistId: string
    id: string,
    title: string,
    status: TaskStatues,
}
export const Tasks = React.memo((props: TasksForRenderType) => {
    const dispatch = useAppDispatch()
    const changeTitleTask = useCallback((title: string) => {
        dispatch(updateTaskTC({todolistId: props.todolistId,taskId:  props.id,model: {title}}))
    },[])
    const onChangeIsDoneHandler = useCallback((newIsDone: boolean, taskId: string, todolistId: string) => {
        let status
        newIsDone ? status = 2 : status = 0
        dispatch(updateTaskTC({todolistId, taskId, model:{status} } ))
    }, [])
    const removeTaskHandler = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTasksTC({todolistId, taskId}))
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