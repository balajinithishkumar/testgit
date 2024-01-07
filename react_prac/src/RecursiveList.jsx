import React, { useEffect, useState } from "react";
import { uid } from "uid";
const RecursiveList = ({ data, onDelete, onAdd }) => {
  return (
    <ul>
      {data.map((item) => (
        <ListItem key={item.id} item={item} onDelete={onDelete} onAdd={onAdd} />
      ))}
    </ul>
  );
};
const ListItem = ({ item, onDelete, onAdd }) => {
  const [showAddButton, setShowAddButton] = useState({});
  const showAddButtonHandler = (listId) => {
    setShowAddButton((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [listId]: true,
    }));
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const handleDelete = () => {
    onDelete(item.id);
  };
  const handleAdd = () => {
    setShowAddForm(true);
  };
  const handleInputChange = (e) => {
    setNewItemName(e.target.value);
  };
  const handleAddSubmit = () => {
    onAdd(item.id, newItemName);
    setShowAddForm(false);
    setNewItemName("");
  };
  return (
    <li style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
          backgroundColor: "lightgray",
          width: "30%",
          height: "20px",
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <p
          onClick={() => {
            showAddButtonHandler(item.id);
          }}
        >
          {item.name}
        </p>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </div>

      {showAddButton[item.id] && (
        <button onClick={handleAdd} style={{ marginTop: "5px" }}>
          Add
        </button>
      )}

      {showAddForm && (
        <div>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              value={newItemName}
              onChange={handleInputChange}
            />
            <input type="submit" />
          </form>
        </div>
      )}

      {item.children && item.children.length > 0 && (
        <RecursiveList data={item.children} onDelete={onDelete} onAdd={onAdd} />
      )}
    </li>
  );
};
const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem("cards")) || [];
  const [dataset, setDataset] = useState(storedTasks);
  const handleDelete = (itemId) => {
    const updatedDataset = removeItem(dataset, itemId);
    setDataset(updatedDataset);
  };

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(dataset));
  }, [dataset]);

  const handleAdd = (parentId, newItemName) => {
    const newItem = {
      id: Date.now(),
      name: newItemName,
      children: [],
    };
    const updatedDataset = addNewItemToDataset(dataset, parentId, newItem);
    setDataset(updatedDataset);
  };

  const addNewItemToDataset = (data, parentId, newItem) => {
    return data.map((item) => {
      if (item.id === parentId) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(newItem);
      } else if (item.children && item.children.length > 0) {
        item.children = addNewItemToDataset(item.children, parentId, newItem);
      }
      return item;
    });
  };
  const removeItem = (data, itemId) => {
    return data.reduce((acc, item) => {
      if (item.id === itemId) {
        if (item.children && item.children.length > 0) {
          acc.push(...item.children);
        }
      } else {
        if (item.children && item.children.length > 0) {
          item.children = removeItem(item.children, itemId);
        }
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const [parent, setparent] = useState("");
  function addparent(e) {
    e.preventDefault();
    setDataset([...dataset, { id: uid(), name: parent }]);
    console.log("add parent", e);
    setparent("");
  }

  return (
    <>
      <form onSubmit={addparent}>
        <input
          type="text"
          value={parent}
          onChange={(e) => {
            setparent(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
      <RecursiveList data={dataset} onDelete={handleDelete} onAdd={handleAdd} />
    </>
  );
};
export default App;
