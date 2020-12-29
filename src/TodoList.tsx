import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./AppWithRedux";


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
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function TodoList(props: TodoListType) {

    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all");
    }
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
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
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
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

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={onChangeStatus}
                            />
                            <EditableSpan onChange={onChangeTaskTitle} title={t.title}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    color={"default"}
                    variant={props.filter === "active" ? "outlined" : "text"}
                >All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "text"}
                >Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                    variant={props.filter === "active" ? "outlined" : "text"}
                >Completed
                </Button>
            </div>
        </div>
    )
}

