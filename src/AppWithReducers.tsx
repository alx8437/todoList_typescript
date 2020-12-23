import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reduser";


export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    //generate ids
    const todoListId1 = v1()
    const todoListId2 = v1()

    //Initial state for tasks and todolists
    const initialTodolists: Array<TodolistType> = [
            {
                id: todoListId1,
                title: "What to learn",
                filter: "all"
            },
            {
                id: todoListId2,
                title: "What to buy",
                filter: "all"
            }
        ]
    const initialTasks: TasksStateType = {
        [todoListId1]: [
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "VanillaJS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "NodeJs", isDone: true},
            {id: v1(), title: "Rest API", isDone: false}
        ]
    }

    //useReducers
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, initialTodolists)
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, initialTasks)

    //Tasks reduce operations
    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId));
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId));
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId));
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title));
    }

    //Todolists reduce operations
    function changeFilterTodolist(todoListId: string, filterValue: FilterValuesType) {
        dispatchToTodolists(changeTodolistFilterAC(todoListId, filterValue));
    }

    function removeTodoList(todolistId: string) {
        dispatchToTodolists(removeTodolistAC(todolistId));
        dispatchToTasks(removeTodolistAC(todolistId));
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodolists(changeTodolistAC(todolistId, title));
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

export default AppWithReducers;

