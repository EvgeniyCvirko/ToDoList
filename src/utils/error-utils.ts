import {appSetErrorAC, AppSetErrorType, appSetStatusAC, AppSetStatusType} from "../state/App-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handelServerNetworkError = (error: any, dispatch:  Dispatch < AppSetErrorType | AppSetStatusType>) => {
    console.log(error.message)
    dispatch(appSetErrorAC(error.message))
    dispatch(appSetStatusAC({status:"failed"}))
}

export const handelServerAppError = <D>(data: ResponseType<D> ,dispatch: Dispatch < AppSetErrorType | AppSetStatusType> ) => {
    if(data.messages.length){
        dispatch(appSetErrorAC(data.messages[0]))
    }else {
        dispatch(appSetErrorAC('some error occured'))
    }
    dispatch(appSetStatusAC({status:"failed"}))
}