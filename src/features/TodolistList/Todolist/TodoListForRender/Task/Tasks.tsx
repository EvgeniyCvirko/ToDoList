import React, {useCallback} from "react";
import {TaskStatues} from "./tasks-reducer";
import s from "../../Style/Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useActions} from "../../../../../utils/hooks";
import {tasksAction} from "./index";

type TasksForRenderType = {
  todolistId: string
  id: string,
  title: string,
  status: TaskStatues,
}

export const Tasks = React.memo((props: TasksForRenderType) => {
  console.log('render task')
  const {updateTaskTC, removeTasksTC} = useActions(tasksAction)

  const changeTitleTask = useCallback((title: string) => {
    updateTaskTC({todolistId: props.todolistId, taskId: props.id, model: {title}})
  }, [props.todolistId, props.id])

  const onChangeIsDoneHandler = useCallback((newIsDone: boolean, taskId: string, todolistId: string) => {
    let status
    newIsDone ? status = 2 : status = 0
    updateTaskTC({todolistId, taskId, model: {status}})
  }, [props.todolistId, props.id])

  return (
    <div key={props.id} className={props.status === TaskStatues.Completed ? s.isDone : ''}>
      <Checkbox checked={props.status === TaskStatues.Completed}
                onChange={(e) => onChangeIsDoneHandler(e.currentTarget.checked, props.id, props.todolistId)}/>
      <EditableSpan title={props.title}
                    status={props.status}
                    changeTitle={changeTitleTask}/>
      <IconButton onClick={() => removeTaskHandler(props.id, props.todolistId)}><Delete/></IconButton>
    </div>
  )
})