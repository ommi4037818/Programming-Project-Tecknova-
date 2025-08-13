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

    const up = (index) => {
    if (index === 0) return;
    const newList = [...todolist];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setList(newList);
  };

  const down = (index) => {
    if (index === todolist.length - 1) return;
    const newList = [...todolist];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setList(newList);
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

      <h2>Pending</h2>
      <ul className="taskList">
        {todolist
          .filter((taskItem) => !taskItem.completed)
          .map((taskItem, containerIndex, containerArray) => {
            const index = todolist.indexOf(taskItem);
            return (
              <li
                key={index}
                className={`taskItem ${taskItem.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={taskItem.completed}
                  onChange={() => complete(index)}
                />
                <div>
                  <strong>{taskItem.name}</strong>
                  <p>{taskItem.description}</p>
                </div>
                <div className="order">
                 <button
                    onClick={() => up(index)}
                    disabled={containerIndex === 0} 
                  >
                    Move Up
                  </button>
                  <button
                    onClick={() => down(index)}
                    disabled={containerIndex === containerArray.length - 1}
                  >
                    Move Down
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>

      <h2>Completed</h2>
      <ul className="taskList">
        {todolist
          .filter((taskItem) => taskItem.completed)
          .map((taskItem, containerIndex, containerArray) => {
            const index = todolist.indexOf(taskItem);
            return (
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
                <div className="order">
                  <button
                    onClick={() => up(index)}
                    disabled={containerIndex === 0} 
                  >
                    Move Up
                  </button>
                  <button
                    onClick={() => down(index)}
                    disabled={containerIndex === containerArray.length - 1} 
                  >
                    Move Down
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="delete"
                    aria-label={`Delete task "${taskItem.name}"`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;