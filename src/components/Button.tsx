import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";


type ButtonPropsType={
    name: string,
    callBack: () => void,
}

export const Button = (props:ButtonPropsType) =>{
   const onClickHandler = () => {
       props.callBack()
   }

    return(<div>
            <button  onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}