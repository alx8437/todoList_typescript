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
        const newTodolistTasks = tasks[todoListId].filter(t => t.id !== id)
        setTasks({...tasks, [todoListId]: newTodolistTasks})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        let newTodolistTasks = [...tasks[todoListId], newTask]
        setTasks({...tasks, [todoListId]: newTodolistTasks})
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        const newTodoLists = todolists.map(tl =>
            (tl.id === todoListId) ? {...tl, filter: filterValue} : tl)
        setTodolists(newTodoLists)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const newTodolistTasks = tasks[todoListId].map(t => {
            if (t.id === taskId) {
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks, [todoListId]: newTodolistTasks})

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

