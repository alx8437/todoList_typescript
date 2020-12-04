import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input
            className={error ? "error" : ""}
            value={title}
            onChange={onChangesHandler}
            onKeyPress={onKeyPressHandler}
        />
        <button onClick={addItem}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>

}