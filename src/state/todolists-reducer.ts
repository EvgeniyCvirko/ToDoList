import {ToDOListType} from "../App";


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<ToDOListType>, action: ActionType): Array<ToDOListType> => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return  [...state.map(e=> e.id === action.id ? {...e, filter: action.filter} : e)]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)

        case "CHANGE-TITLE":
            return     [...state.map(t=> t.id===action.id ? {...t, title: action.title} : t)]
        case "ADD-TODOLIST":
            return     [action.todolist,...state]

        default:
            throw new Error("I don't understand this type")
    }
}

