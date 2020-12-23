import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    //Tasks reduce operations
    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId));
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId));
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, title));
    }

    //Todolists reduce operations
    function changeFilterTodolist(todoListId: string, filterValue: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todoListId, filterValue));
    }

    function removeTodoList(todolistId: string) {
        dispatch(removeTodolistAC(todolistId));
    }

    function addTodoList(title: string) {
        dispatch(addTodolistAC(title));

    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatch(changeTodolistAC(todolistId, title));
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6"> News </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodoListTasks = tasks[tl.id]
                            let taskForTodoList = allTodoListTasks
                            switch (tl.filter) {
                                case "active":
                                    taskForTodoList = allTodoListTasks.filter(t => !t.isDone)
                                    break
                                case "completed":
                                    taskForTodoList = allTodoListTasks.filter(t => t.isDone)
                                    break
                                case "all":
                                    taskForTodoList = allTodoListTasks
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilterTodolist}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

