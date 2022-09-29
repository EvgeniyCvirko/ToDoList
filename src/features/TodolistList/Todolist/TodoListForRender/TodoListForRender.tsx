import React, {useCallback, useEffect} from 'react';
import s from '../Style/Todolist.module.css'
import {EditableSpan} from "../../../../components/EditableSpan";
import {AddItem, AddItemFormSubmitHelperType} from "../../../../components/AddItem";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatues} from "./Task/tasks-reducer";
import {
  FilterType,
  TodoListDomainType
} from "../todolists-reducer";
import {Tasks} from "./Task/Tasks";
import {useActions, useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {todolistActions} from "../index";
import {tasksAction} from "./Task";

type TodoListPropsType = {
  id: string,
  todoList: TodoListDomainType,
}

export const TodoListForRender = React.memo((props: TodoListPropsType) => {
  console.log('renderTodoListForRender')
  const tasks = useAppSelector(state => state.task[props.id])
  const {updateTodolistTitleTC, removeTodolistTC, changeFilterAC} = useActions(todolistActions)
  const {setTasksTC} = useActions(tasksAction)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTasksTC(props.id)
  }, [])

  const changeTitleTodoList = useCallback((title: string) => {
    updateTodolistTitleTC({todolistId: props.id, title})
  }, []);

  const removeTodoListHandler = () => {
    removeTodolistTC(props.id)
  }

  const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {

    let thunk = tasksAction.addTasksTC({title: title, todolistId: props.todoList.id})
    const resultAction = await dispatch(thunk)

    if (tasksAction.addTasksTC.rejected.match(resultAction)) {
      if (resultAction.payload?.errors?.length) {
        const errorMessage = resultAction.payload?.errors[0]
        helper.setError(errorMessage)
      } else {
        helper.setError('Some error occured')
      }
    } else {
      helper.setTitle('')
    }

  }, [props.todoList.id])

  const buttonRender = (filterButton: FilterType, variant: 'text' | 'outlined' | 'contained', color: PropTypes.Color) => {

    return (
      <Button className={filterButton} onClick={() => changeFilterAC({TodoList_ID: props.id, newFilter: filterButton})}
              variant={props.todoList.filter === filterButton ? 'outlined' : 'text'}
              color={color}>{filterButton.toUpperCase()}</Button>)
  }

  let tasksForRender = tasks;
  if (props.todoList.filter === 'active') {
    tasksForRender = tasks.filter(tl => tl.status === TaskStatues.New)
  }
  if (props.todoList.filter === 'completed') {
    tasksForRender = tasks.filter(tl => tl.status === TaskStatues.Completed)
  }
  const ulList = tasksForRender.length
    ? tasksForRender.map(el =>
      <Tasks id={el.id}
             title={el.title}
             status={el.status}
             key={el.id}
             todolistId={props.id}/>
    )
    : <span>{'Нет в списке задач'}</span>
  return (
    <div>
      <div className={s.block}>
        <EditableSpan title={props.todoList.title}
                      changeTitle={changeTitleTodoList}
                      style='bold'/>
        <IconButton style={{padding: "0", flexBasis: '10%'}} onClick={removeTodoListHandler}><Delete/></IconButton>
      </div>
      <AddItem
        addItem={addTaskCallback}/>
      <ul className={s.ul}>
        {ulList}
      </ul>
      {buttonRender('all', 'contained', 'default')}
      {buttonRender('active', 'contained', 'primary')}
      {buttonRender('completed', 'contained', 'secondary')}
    </div>
  )
})

