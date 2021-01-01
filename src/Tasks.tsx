import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void,
    task: TaskType,
    todolistId: string,
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void,
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void,

}

const Task: React.FC<TaskPropsType> = React.memo(({
                                                      removeTask,
                                                      task,
                                                      todolistId,
                                                      changeTaskStatus,
                                                      changeTaskTitle,
                                                  }) => {
    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneStatus = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneStatus, todolistId)
    }
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(todolistId, task.id, title)
    }, [changeTaskTitle, todolistId, task.id])

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            checked={task.isDone}
            onChange={onChangeStatus}
        />
        <EditableSpan onChange={onChangeTaskTitle} title={task.title}/>
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})

export default Task;