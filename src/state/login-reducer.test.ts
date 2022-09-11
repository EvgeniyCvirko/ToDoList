import {loginReducer, setLoginForm} from "./login-reducer";

test("loginState should be after add",()=>{
    const startState = {
        isLogin: false,
        loginState : {
            email: '',
            password: '',
            rememberMe: false
        }
    }
    const newState = {
        email: 'EC@mai.ru',
        password: '123',
        rememberMe: true
    }
    const endState = loginReducer(startState, setLoginForm({loginState:newState}))
    expect(endState.loginState.email).toBe('EC@mai.ru')
    expect(endState.loginState.password).toBe('123')
    expect(endState.loginState.rememberMe).toBe(true)
})