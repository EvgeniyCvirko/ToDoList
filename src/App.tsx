import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";

type ToDOListType = {
    id: string
    title: string
}
export const App = () => {
    /*  const [task, setTask] = useState([
          {id: v1(), title: "HTML&CSS", isDone: false},
          {id: v1(), title: "JS", isDone: false},
          {id: v1(), title: "ReactJS", isDone: false},
          {id: v1(), title: "Redux", isDone: false},
      ])*/
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDOListType>>([
        {id: toDoListID1, title: 'What to learn'},
        {id: toDoListID2, title: 'What to buy'},
    ])

    let [taskObj, setTask] = useState({
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...task])
    }

    const removeTask = (id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        let filteredTask = task.filter(el => el.id !== id);
        taskObj[toDoListId] = filteredTask;
        setTask({...taskObj})
    }

    const statusTask = (newIsDone: boolean, id: string, toDoListId: string) => {
        let task = taskObj[toDoListId]
        let newStatusTask = task.map(e => e.id === id ? {...e, isDone: newIsDone} : e);
        taskObj[toDoListId] = newStatusTask;
        setTask({...taskObj})
    }


    return (
        <div className='app'>
            {
                toDoLists.map(tl => {
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        task={taskObj[tl.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        statusTask={statusTask}
                    />
                })}
            {/* <TodoList
                task={task[toDoListID1]}
                removeTask={removeTask}
                addTask={addTask}
                statusTask={statusTask}
            />
            <TodoList
                task={task[toDoListID2]}
                removeTask={removeTask}
                addTask={addTask}
                statusTask={statusTask}*/}
            />
        </div>
    )
}