import {appSetErrorAC,  appSetStatusAC} from "../state/App-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";
import { TaskThunkType} from "../state/tasks-reducer";

export const handelServerNetworkError = (error: any, dispatch:  Dispatch <TaskThunkType>) => {
    dispatch(appSetErrorAC(error.message))
    dispatch(appSetStatusAC("failed"))
}

export const handelServerAppError = <D>(data: ResponseType<D> ,dispatch: Dispatch <TaskThunkType> ) => {
    if(data.messages.length){
        dispatch(appSetErrorAC(data.messages[0]))
    }else {
        dispatch(appSetErrorAC('some error occured'))
    }
    dispatch(appSetStatusAC("failed"))
}