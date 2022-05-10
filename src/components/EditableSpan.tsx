import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
}

export const EditableSpan = (props: EditableSpanType) => {


    return (<span> {props.title} </span>
    )
}