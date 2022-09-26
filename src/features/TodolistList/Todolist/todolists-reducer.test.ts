import {
    addTodolistsTC,
    changeFilterAC,
    fetchTodolistsTC, removeTodolistsTC,
    ToDOListDomainType,
    todolistsReducer, updateTodolistTitleTC
} from './todolists-reducer';

const startState: Array<ToDOListDomainType> = [
    {id: "toDoListID1", title: 'What to learn', filter:'all', addedDate: new Date(), order:0},
    {id: "toDoListID2", title: 'What to buy', filter:'all',addedDate: new Date(), order:0},
]

test('correct todolist should be changed filter', () => {

    const TodoList_ID = "toDoListID1";
    const newFilter = "all"

    const endState = todolistsReducer(startState, changeFilterAC({TodoList_ID:TodoList_ID,newFilter: newFilter}))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("all")
    expect(endState.length).toBe(2)

});

test( 'correct todolist should be removed', ()=>{
    const action = removeTodolistsTC.fulfilled({todolistId:"toDoListID1"}, '', {todolistId:"toDoListID1"})
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("toDoListID2")
})

test( 'correct todolist should be changed title', ()=>{
    let newTitle = "What to read"
    const action = updateTodolistTitleTC.fulfilled({todolistId: "toDoListID1",title: newTitle}, '', {todolistId: "toDoListID1",title: newTitle})
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to read")
    expect(endState[1].title).toBe("What to buy")
})
test( 'correct todolist should be add', ()=>{
    const endTodo = {id: "toDoListID3", title: 'What to read', addedDate: new Date(), order: 0}
    const action = addTodolistsTC.fulfilled({todolist: endTodo}, '',{title: ''} )
    const endState = todolistsReducer(startState, action )

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('toDoListID3')
    expect(endState[2].title).toBe("What to buy")
})

test('correct Old should be set', () => {
 const action = fetchTodolistsTC.fulfilled({todolists: startState}, '')
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)

});