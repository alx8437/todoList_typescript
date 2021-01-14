import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Tasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reduser";
import {changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC} from "./state/todolist-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodoListPropsType = {
    id: string
    title: string
    filter: string
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     id,
                                                                     title,
                                                                     filter,
                                                                 }) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const tasksFilter = useCallback((tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        switch (filter) {
            case "active": return  tasks.filter(t => !t.isDone);
            case "completed": return  tasks.filter(t => t.isDone);
            case "all": return tasks;
            default: return tasks;
        }
    }, [])

    const tasksForTodoList = tasksFilter(tasks[id], filter)

    const onAllClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, "all"));
    }
    const onActiveClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, "active"));
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodolistFilterAC(id, "completed"));
    }

    const removeTodoList = () => {
        dispatch(removeTodolistAC(id))
    }


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }


    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    tasksForTodoList.map(t => <Task
                            key={id}
                            task={t}
                            todolistId={id}
                        />)
                }
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    color={"default"}
                    variant={filter === "active" ? "outlined" : "text"}
                >All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={"primary"}
                    variant={filter === "active" ? "outlined" : "text"}
                >Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                    variant={filter === "active" ? "outlined" : "text"}
                >Completed
                </Button>
            </div>
        </div>
    )
})

