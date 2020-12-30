import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./AppWithRedux";
import Task from "./Tasks";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
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

export const TodoList = React.memo((props: TodoListPropsType) => {

    console.log("Todolist is called");


    const tasksFilter = useCallback((tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        switch (filter) {
            case "active": return  tasks.filter(t => !t.isDone);
            case "completed": return  tasks.filter(t => t.isDone);
            case "all": return tasks;
            default: return tasks;
        }
    }, [])
    const tasksForTodoList = tasksFilter(props.tasks, props.filter)

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, "all");
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, "active")
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, "completed")
    }, [props.changeFilter, props.id]);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])


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
                    tasksForTodoList.map(t => <Task
                            task={t}
                            removeTask={props.removeTask}
                            todolistId={props.id}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />)
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
})

