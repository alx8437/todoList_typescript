import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
            {id: 1, title: "React", isDone: true},
            {id: 2, title: "VanillaJS", isDone: false},
            {id: 3, title: "NodeJs", isDone: true},
            {id: 4, title: "Rest API", isDone: false},
            {id: 5, title: "GraphQL", isDone: true},
        ]
    )

    function removeTask(id: number) {
        const filteredTasks = tasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    let taskForTodoList = tasks;

    if (filter === "active") {
        taskForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        taskForTodoList = tasks.filter(t => t.isDone)
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
            />
        </div>
    );
}

export default App;

