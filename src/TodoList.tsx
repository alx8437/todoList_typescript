import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: Function
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState("")

    const onChangesHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(title);
            setTitle("");
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");




    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangesHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={() => {
                        props.addTask(title);
                        setTitle("")
                    }}
                >+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id)

                        return  <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => onAllClickHandler}>All</button>
                <button onClick={() => onActiveClickHandler}>Active</button>
                <button onClick={() => onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
