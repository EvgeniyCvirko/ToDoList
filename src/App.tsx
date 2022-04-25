import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {v1} from "uuid";

export const App = () => {
    const [task, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const addTask = (newTitle: string) => {
        let newTask =  {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...task])
    }

    const removeTask = (id: string) => {
        setTask(task.filter(el => el.id !== id))
    }

    const statusTask = (newIsDone: boolean, id:string) =>{
        setTask(task.map(e => e.id === id ? {...e, isDone:newIsDone } : e))
    }

    return (
        <div className='app'>
            <TodoList
                task={task}
                removeTask={removeTask}
                addTask={addTask}
                statusTask={statusTask}
            />
        </div>
    )
}