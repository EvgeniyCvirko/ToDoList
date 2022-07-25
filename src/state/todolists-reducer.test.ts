import {
    addToDoAC,
    changeFilterAC,
    changeTitleAC,
    removeToDoAC, setTodolistsAC,
    ToDOListDomainType,
    todolistsReducer
} from './todolists-reducer';

const startState: Array<ToDOListDomainType> = [
    {id: "toDoListID1", title: 'What to learn', filter:'all', addedDate: new Date(), order:0},
    {id: "toDoListID2", title: 'What to buy', filter:'all',addedDate: new Date(), order:0},
]

test('correct todolist should be changed filter', () => {

    const TodoList_ID = "toDoListID1";
    const newFilter = "all"

    const endState = todolistsReducer(startState, changeFilterAC(TodoList_ID, newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("all")
    expect(endState.length).toBe(2)

});

test( 'correct todolist should be removed', ()=>{

    const endState = todolistsReducer(startState, removeToDoAC("toDoListID1"))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("toDoListID2")
})

test( 'correct todolist should be changed title', ()=>{
    let newTitle = "What to read"
    const endState = todolistsReducer(startState, changeTitleAC("toDoListID1", newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to read")
    expect(endState[1].title).toBe("What to buy")
})
test( 'correct todolist should be add', ()=>{

    const endState = todolistsReducer(startState, addToDoAC("What to read") )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("What to read")
    expect(endState[1].id).toBe('toDoListID1')
    expect(endState[2].title).toBe("What to buy")
})

test('correct todolists should be set', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(2)

});