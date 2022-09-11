import {appReducer, appSetErrorAC, appSetStatusAC} from "./App-reducer";

const startState={
    status: 'idle',
    error: null,
    isAuth: false
}
test('correct status should be changed status', () => {
const newStatus = 'loading'
    const endState = appReducer(startState, appSetStatusAC({status:newStatus}))
    expect(endState.status).toBe('loading')
});

test( 'correct error should be changed error', ()=>{
    const newError = 'some error'
    const endState = appReducer(startState, appSetErrorAC({error:newError}))
    expect(endState.error).toBe('some error')
})

