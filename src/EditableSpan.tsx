import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>("")

    const activateEditMode = () =>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            activateViewMode()
        }
    }


    return editMode
        ? <TextField
            variant={"standard"}
            value={title}
            onBlur={activateViewMode}
            autoFocus
            onChange={onChangeTitleHandler}
            onKeyPress={onKeyPressHandler}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}