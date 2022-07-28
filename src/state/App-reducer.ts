
//types
export type AppSetErrorType = ReturnType <typeof appSetErrorAC>
export type AppSetStatusType = ReturnType <typeof appSetStatusAC>
type ActionsType = AppSetStatusType | AppSetErrorType
export type StatusType= 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorType= string | null

export type InitialStateType = {
    status: StatusType
    error: ErrorType
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
//action
export const appSetStatusAC = (status:StatusType) => ({type: "APP/SET-STATUS", status} as const)
export const appSetErrorAC = (error:ErrorType) => ({type: "APP/SET-ERROR", error} as const)


