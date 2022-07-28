import {appReducer, appSetErrorAC, appSetStatusAC, InitialStateType} from "./App-reducer";

const startState:  InitialStateType={
    status: 'idle',
    error: null
}
test('correct status should be changed status', () => {
const newStatus = 'loading'
    const endState = appReducer(startState, appSetStatusAC(newStatus))
    expect(endState.status).toBe('loading')
});

test( 'correct error should be changed error', ()=>{
    const newError = 'some error'
    const endState = appReducer(startState, appSetErrorAC(newError))
    expect(endState.error).toBe('some error')
})

