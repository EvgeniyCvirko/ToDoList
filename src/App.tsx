import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem";

type ToDOListType = {
    id: string
    title: string
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type taskObjType={
    [toDoListID: string]: TaskType[]
}


export const App = () => {
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDOListType>>([
        {id: toDoListID1, title: 'What to learn'},
        {id: toDoListID2, title: 'What to buy'},
    ])
    let [taskObj, setTask] = useState<taskObjType>({
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Crisps", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
        ],
    })
    console.log(taskObj)
    const addTask = (newTitle: string, toDoListId: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = [newTask, ...task]
        setTask({...taskObj})
    }
    const addTodoList = (titleTodoList: string) => {
        const newTodoListID = v1();
        setToDoLists([...toDoLists,{ id: newTodoListID, title: titleTodoList}])
        setTask({...taskObj,[newTodoListID]: []})
    }
    const removeTask = (id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = task.filter(el => el.id !== id);
        setTask({...taskObj})
    }
    const removeTodoList = (toDoListId: string) =>{
        setToDoLists(toDoLists.filter( t => t.id!==toDoListId))
        delete taskObj[toDoListId]
    }
    const statusTask = (newIsDone: boolean, id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        taskObj[toDoListId] = task.map(e => e.id === id ? {...e, isDone: newIsDone} : e);
        setTask({...taskObj})
    }
    const todoListForRender = toDoLists.map(tl => {
        return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            task={taskObj[tl.id]}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            addTask={addTask}
            statusTask={statusTask}
        />
    })
    return (
        <div className='app'>
            <AddItem
                addItem={addTodoList} />
            {todoListForRender}
        </div>
    )
}