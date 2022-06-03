import {addToDoAC, removeToDoAC, } from './todolists-reducer';
import {taskObjType } from '../App';
import {addTasksAC, changeStatusTasksAC, changeTitleTasksAC, removeTasksAC, tasksReducer} from "./tasks-reducer";

test('correct tasks should be changed status', () => {
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
 const action = changeStatusTasksAC('2', false,'toDoListID2')
    const endState = tasksReducer(startState,action )
    expect(endState['toDoListID1'][1].isDone).toBe(true)
    expect(endState['toDoListID2'][1].isDone).toBe(false)


});

test( 'correct tasks should be removed', ()=>{
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
    const action = removeTasksAC('toDoListID1', '2')
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(3)
    expect(endState['toDoListID1'][0].id).toBe('1')
    expect(endState['toDoListID1'][1].id).toBe('3')
    expect(endState['toDoListID2'].length).toBe(3)
})

test( 'correct tasks should be changed title', ()=>{
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
    const action = changeTitleTasksAC('toDoListID1', '2', 'Milk')
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'][1].title).toBe('Milk')
    expect(endState['toDoListID2'][1].title).toBe("Crisps")
})
test( 'correct tasks should be add', ()=>{
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
    const action = addTasksAC( 'Car','toDoListID1', )
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(5)
    expect(endState['toDoListID2'].length).toBe(3)
    expect(endState['toDoListID1'][0].title).toBe('Car')
    expect(endState['toDoListID1'][0].isDone).toBe(false)
    expect(endState["toDoListID1"][0].id).toBeDefined();
    expect(endState["toDoListID1"][0].id).toBe('10');
})
test( 'correct tasks should be add when add Todolist', ()=>{
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
    const action = addToDoAC( 'What to learn' )
    const endState = tasksReducer(startState, action)
    const key = Object.keys(endState)
    const newKey = key.find(k => k !== 'toDoListID2' && k !== 'toDoListID1' )
    if( !newKey) {
          throw Error("Error: key is not find ")
    }
    expect( key.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})
test( 'correct tasks should be remove when add Todolist', ()=>{
    const startState: taskObjType = {
        'toDoListID1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'toDoListID2': [
            {id: '1', title: "Beer", isDone: false},
            {id: '2', title: "Crisps", isDone: true},
            {id: '3', title: "Fish", isDone: false},
        ],
    }
    const action = removeToDoAC( 'toDoListID2' )
    const endState = tasksReducer(startState, action)
    expect( Object.keys(endState).length).toBe(1);
    expect(endState['toDoListID1'].length).toBe(4);
})
