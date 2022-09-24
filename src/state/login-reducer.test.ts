import {loginReducer, loginTC} from "./login-reducer";

test("loginState should be after add",()=>{
    const startState = {
        isLogin: false,
    }
    const newState = {
        email: 'EC@mai.ru',
        password: '123',
        rememberMe: true
    }
    const action = loginTC.fulfilled ({isLogin:true}, '', {stateLogin:newState})
    const endState = loginReducer(startState, action)
    expect(endState.isLogin).toBe(true)
})