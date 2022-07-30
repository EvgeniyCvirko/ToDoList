import {appSetErrorAC, AppSetErrorType, appSetStatusAC, AppSetStatusType} from "../state/App-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handelServerNetworkError = (error: any, dispatch:  Dispatch < AppSetErrorType | AppSetStatusType>) => {
    dispatch(appSetErrorAC(error.message))
    dispatch(appSetStatusAC("failed"))
}

export const handelServerAppError = <D>(data: ResponseType<D> ,dispatch: Dispatch < AppSetErrorType | AppSetStatusType> ) => {
    if(data.messages.length){
        dispatch(appSetErrorAC(data.messages[0]))
    }else {
        dispatch(appSetErrorAC('some error occured'))
    }
    dispatch(appSetStatusAC("failed"))
}