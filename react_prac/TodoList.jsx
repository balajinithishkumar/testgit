import React, { useState } from "react";

const TodoList = () => {
  const [showAddButton, setShowAddButton] = useState({});
  const [newTask, setNewTask] = useState({});
  const showAddButtonHandler = (listId) => {
    setShowAddButton((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [listId]: true,
    }));
  };
  const addTaskHandler = (listId) => {
    console.log(`Adding task "${newTask[listId]}" to list ${listId}`);
    setNewTask((prev) => ({ ...prev, [listId]: "" }));
  };

  return (
    <div>
      <h2>Todo List 1</h2>
      <button onClick={() => showAddButtonHandler("list1")}>Add Task</button>
      {showAddButton["list1"] && (
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={newTask["list1"] || ""}
            onChange={(e) => setNewTask({ ...newTask, list1: e.target.value })}
          />
          <button onClick={() => addTaskHandler("list1")}>Add</button>
        </div>
      )}
      <h2>Todo List 2</h2>
      <button onClick={() => showAddButtonHandler("list2")}>Add Task</button>
      {showAddButton["list2"] && (
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={newTask["list2"] || ""}
            onChange={(e) => setNewTask({ ...newTask, list2: e.target.value })}
          />
          <button onClick={() => addTaskHandler("list2")}>Add</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
