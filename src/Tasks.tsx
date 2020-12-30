import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void,
    task: TaskType,
    todolistId: string,
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void,
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void,

}

const Task = (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneStatus = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneStatus, props.todolistId)
    }
    const onChangeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            checked={props.task.isDone}
            onChange={onChangeStatus}
        />
        <EditableSpan onChange={onChangeTaskTitle} title={props.task.title}/>
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
}

export default Task;