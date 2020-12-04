import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function TodoList(props: TodoListType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id);
    }
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneStatus = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneStatus, props.id)
                        }
                        const onChangeTaskTitle = (title: string) => {
                            props.changeTaskTitle(props.id, t.id, title)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatus}
                            />
                            <EditableSpan onChange={onChangeTaskTitle} title={t.title}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    )
}

