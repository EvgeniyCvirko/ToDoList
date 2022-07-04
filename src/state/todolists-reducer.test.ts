import {addToDoAC, changeFilterAC, changeTitleAC, removeToDoAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {ToDOListType} from '../App';

test('correct todolist should be changed filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const TodoList_ID = todolistId1;
    const newFilter = "Yo"
    const startState: Array<ToDOListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistsReducer(startState, changeFilterAC(TodoList_ID, newFilter))

    expect(endState[0].filter).toBe("Yo")
    expect(endState[1].filter).toBe("all")
    expect(endState.length).toBe(2)

});

test( 'correct todolist should be removed', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<ToDOListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistsReducer(startState, removeToDoAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test( 'correct todolist should be changed title', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTitle = "What to read"
    const startState: Array<ToDOListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistsReducer(startState, changeTitleAC(todolistId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to read")
    expect(endState[1].title).toBe("What to buy")
})
test( 'correct todolist should be add', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<ToDOListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistsReducer(startState, addToDoAC("What to read") )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("What to read")
    expect(endState[1].id).toBe(todolistId1)
    expect(endState[2].title).toBe("What to buy")
})