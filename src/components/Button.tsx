import React from 'react';

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