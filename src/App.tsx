import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const tasks1 = [
        {id: 1, title: "React", isDone: true},
        {id: 2, title: "VanillaJS", isDone: true},
        {id: 3, title: "NodeJs", isDone: true}
    ]

    const  tasks2 = [
        {id: 1, title: "Hello", isDone: true},
        {id: 2, title: "Hi", isDone: true},
        {id: 3, title: "Hey", isDone: true}
    ]


    return (
        <div className="App">
           <TodoList title={"What to learn"} tasks={tasks1}/>
           <TodoList title={"Songs"} tasks={tasks2}/>
        </div>
    );
}

export default App;

