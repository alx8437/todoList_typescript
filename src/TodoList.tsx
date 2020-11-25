import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    filter: string
}

export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)


    const onChangesHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask();
            setTitle("");
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id);
    }
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id);
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>

            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangesHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneStatus = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneStatus, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                >Completed</button>
            </div>
        </div>
    )
}
