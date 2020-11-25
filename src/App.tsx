import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: string
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
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
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "VanillaJS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "NodeJs", isDone: true},
            {id: v1(), title: "Rest API", isDone: false}
        ]
    });



    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todolists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let changeTask = todoListTasks.find((t) => t.id === id)
        if (changeTask) {
            changeTask.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodoList(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
    }


    return (
        <div className="App">
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

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;

