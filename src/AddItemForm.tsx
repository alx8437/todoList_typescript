import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem}) =>  {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangesHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            appendItem();
            setTitle("");
        }
    }

    const appendItem = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
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
            onClick={appendItem}>
            <AddBox/>
        </IconButton>
    </div>
});