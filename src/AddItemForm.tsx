import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangesHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem();
            setTitle("");
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return <div>
        <TextField
            error={!!error}
            helperText={error}
            variant={"standard"}
            value={title}
            onChange={onChangesHandler}
            onKeyPress={onKeyPressHandler}
        />
        <IconButton
            color="primary"
            onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>

}