import {addTodolistsTC, fetchTodolistsTC, removeTodolistsTC} from '../../todolists-reducer';
import {
    addTasksTC,
    ModelDomainTaskType, removeTasksTC,
    setTasksTC,
    taskObjType, TaskPriority,
    TaskStatues, updateTaskTC,
} from "./tasks-reducer";
import {tasksReducer} from "./index";

const startState: taskObjType = {
    'toDoListID1': [
        {
            id: '1',
            title: "HTML&CSS",
            todoListId: 'toDoListID1',
            status: TaskStatues.New,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
        {
            id: '2',
            title: "JS",
            todoListId: 'toDoListID1',
            status: TaskStatues.Completed,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
        {
            id: '3',
            title: "ReactJS",
            todoListId: 'toDoListID1',
            status: TaskStatues.New,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
        {
            id: '4',
            title: "Redux",
            todoListId: 'toDoListID1',
            status: TaskStatues.New,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
    ],
    'toDoListID2': [
        {
            id: '1',
            title: "Beer",
            todoListId: 'toDoListID2',
            status: TaskStatues.New,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
        {
            id: '2',
            title: "Crisps",
            todoListId: 'toDoListID1',
            status: TaskStatues.Completed,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
        {
            id: '3',
            title: "Fish",
            todoListId: 'toDoListID2',
            status: TaskStatues.New,
            priority: TaskPriority.Low,
            startDate: new Date(),
            addedDate: new Date(),
            deadline: new Date(),
            order: 0,
            description: '',
            completed: false
        },
    ],
}
test('correct tasks should be update', () => {
    const model: ModelDomainTaskType = {
        status: 0,
        title: 'yoyoyo'
    }
    let data = {todolistId:'toDoListID1',taskId: '2',model: model}
    const action = updateTaskTC.fulfilled(data, "request id",data )
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'][2].status).toBe(0)
    expect(endState['toDoListID1'][1].title).toBe('yoyoyo')
});
test('correct tasks should be removed', () => {

    const action = removeTasksTC.fulfilled({todolistId: 'toDoListID1', id: '2'},'',{todolistId: 'toDoListID1', taskId: '2'})
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(3)
    expect(endState['toDoListID1'][0].id).toBe('1')
    expect(endState['toDoListID1'][1].id).toBe('3')
    expect(endState['toDoListID2'].length).toBe(3)
})
test('correct tasks should be add', () => {

    const action = addTasksTC.fulfilled({task:startState['toDoListID1'][0], todolistId:'toDoListID1'},'',{newTitle:'', todolistId:'toDoListID1'} )
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(5)
    expect(endState["toDoListID1"][0].id).toBeDefined();
})
 test('correct tasks should be add when add Todolists', () => {
const newToDo = {
    id: "toDoListID3", title: 'What to learn', addedDate: new Date(), order: 0
}
     const action = addTodolistsTC.fulfilled({todolist: newToDo}, '',{title: ''} )
     const endState = tasksReducer(startState, action)
     const key = Object.keys(endState)
     const newKey = key.find(k => k !== 'toDoListID2' && k !== 'toDoListID1')
     if (!newKey) {
         throw Error("Error: key is not find ")
     }
     expect(key.length).toBe(3);
     expect(endState[newKey]).toEqual([]);

 })
 test('correct tasks should be remove when add Todolists', () => {

     const action = removeTodolistsTC.fulfilled({todolistId:"toDoListID2"}, '', {todolistId:"toDoListID2"})
     const endState = tasksReducer(startState, action)
     expect(Object.keys(endState).length).toBe(1);
     expect(endState['toDoListID1'].length).toBe(4);
 })
 test('empty array should be after we set Old', () => {
     const newToDoLists = [
         {id: "1", title: 'title1', addedDate: new Date(), order: 0},
         {id: "2", title: 'title2', addedDate: new Date(), order: 0},
     ]
     const action = fetchTodolistsTC.fulfilled({todolists: newToDoLists}, '')
     const endState = tasksReducer({}, action)
     const key = Object.keys(endState)
     expect(key.length).toBe(2);
     expect(endState['1']).toEqual([]);
     expect(endState['2']).toEqual([]);

 })
test('correct tasks should be set', () => {
    const action = setTasksTC.fulfilled({todolistId:'toDoListID1',tasks: startState['toDoListID1']},'','toDoListID1')
    const endState = tasksReducer({
        'toDoListID1': [],
        'toDoListID2': [],
    }, action)
    expect(endState['toDoListID1'].length).toBe(4)
    expect(endState['toDoListID2'].length).toBe(0)
    expect(endState['toDoListID1'][0].title).toBe('HTML&CSS')
    expect(endState["toDoListID1"][0].id).toBeDefined();
})
