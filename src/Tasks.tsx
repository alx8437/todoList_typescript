import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";

type TaskPropsType = {
    task: TaskType,
    todolistId: string,

}

const Task: React.FC<TaskPropsType> = React.memo(({
                                                      task,
                                                      todolistId,
                                                  }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId));
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, status, todolistId));
    };
    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title));
    };

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