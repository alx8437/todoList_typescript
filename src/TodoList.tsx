import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
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

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     id,
                                                                     title,
                                                                     filter,
                                                                     tasks,
                                                                     removeTask,
                                                                     changeFilter,
                                                                     addTask,
                                                                     changeTaskStatus,
                                                                     removeTodoList,
                                                                     changeTaskTitle,
                                                                     changeTodolistTitle,
                                                                 }) => {
    const tasksFilter = useCallback((tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        switch (filter) {
            case "active": return  tasks.filter(t => !t.isDone);
            case "completed": return  tasks.filter(t => t.isDone);
            case "all": return tasks;
            default: return tasks;
        }
    }, [])
    const tasksForTodoList = tasksFilter(tasks, filter)

    const onAllClickHandler = useCallback(() => {
        changeFilter(id, "all");
    }, [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => {
        changeFilter(id, "active")
    }, [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => {
        changeFilter(id, "completed")
    }, [changeFilter, id]);

    const deleteTodoList = () => {
        removeTodoList(id)
    }

    const appendTask = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id]);

    const exchangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(id, title)
    }, [changeTodolistTitle, id])


    return (
        <div>
            <h3><EditableSpan title={title} onChange={exchangeTodolistTitle} />
                <IconButton onClick={deleteTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={appendTask} />
            <div>
                {
                    tasksForTodoList.map(t => <Task
                            key={id}
                            task={t}
                            removeTask={removeTask}
                            todolistId={id}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
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

