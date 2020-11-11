import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "VanillaJS", isDone: false},
            {id: v1(), title: "NodeJs", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true},
        ]
    )

    function removeTask(id: string) {
        const filteredTasks = tasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        const newTasks: Array<TaskType> = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    let taskForTodoList = tasks;

    switch (filter) {
        case "active":
            taskForTodoList = tasks.filter(t => !t.isDone)
            break
        case "completed":
            taskForTodoList = tasks.filter(t => t.isDone)
            break
        case "all":
            taskForTodoList = tasks
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;

