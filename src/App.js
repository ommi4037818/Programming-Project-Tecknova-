import React, { useState } from "react";
import "./App.css";

function App() {
  const [todolist, setList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const addItem = () => {
    if (name.trim() === "" || description.trim() === "") {
      setError("Name and description can't be empty.");
      return;
    }
    const taskItem = { 
      name: name, 
      description: description, 
      completed: false 
    };
    setList([...todolist, taskItem]); 
    setName("");
    setDescription("");
    setError("");
  };

  const deleteItem = (index) => {
    setList(todolist.filter((_, i) => i !== index));
  };

  const complete = (index) => {
    setList(
      todolist.map((taskItem, i) =>
        i === index ? { ...taskItem, completed: !taskItem.completed } : taskItem
      )
    );
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>

      <div className="input">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          aria-label="Enter task name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          aria-label="Enter task description"
        />
        <button onClick={addItem} aria-label="Add new task item">
          Add Task
        </button>
      </div>

      {error && <p className="feedback">{error}</p>}

      <ul className="taskList">
        {todolist.map((taskItem, index) => (
          <li
            key={index}
            className={`taskItem ${taskItem.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={taskItem.completed}
              onChange={() => complete(index)}
              aria-label={`Mark task "${taskItem.name}" as complete`}
            />
            <div>
              <strong>{taskItem.name}</strong>
              <p>{taskItem.description}</p>
            </div>
            <button
              onClick={() => deleteItem(index)}
              className="delete"
              aria-label={`Delete task "${taskItem.name}"`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
