import React, { useEffect, useState } from "react";
import { uid } from "uid";
const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem("cards")) || {};
  const [data, setData] = useState(storedTasks);
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(data));
  }, [data]);
  const [name, setname] = useState("");
  const [viewbtn, setviewbtn] = useState(false);
  const [showAddButton, setShowAddButton] = useState({});
  const showAddButtonHandler = (listId) => {
    setShowAddButton((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [listId]: true,
    }));
  };
  const [showAddinput, setShowAddinput] = useState({});
  const showAddinputHandler = (listId) => {
    setShowAddinput((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [listId]: true,
    }));
  };
  const addChildToParent = (e, parentId) => {
    e.preventDefault();
    if (e.target[0].value == "") {
      return;
    }
    setData((prevData) => {
      const newData = { ...prevData };
      findAndModify(newData, parentId, { id: uid(), name: e.target[0].value });
      console.log(newData);
      // setShowAddButton(true);
      setShowAddinput(true);
      return newData;
    });
  };
  const findAndModify = (currentData, parentId, newChild) => {
    if (currentData.id === parentId) {
      if (!currentData.children) {
        currentData.children = [];
      }
      currentData.children.push(newChild);
    } else if (currentData.children) {
      currentData.children.forEach((child) =>
        findAndModify(child, parentId, newChild)
      );
    }
  };
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  function deleteparent(tree) {
    console.log(tree);
    if (tree.id) {
      if (!tree.children) {
        setData({});
        return;
      }
    }
  }

  function deleteItemAndMoveChildren(tree, targetIdToDelete) {
    if (!tree || typeof tree !== "object" || !tree.children) {
      return;
    }

    const { children } = tree;
    const indexToDelete = children.findIndex(
      (item) => item.id === targetIdToDelete
    );
    if (indexToDelete !== -1) {
      const deletedItem = children.splice(indexToDelete, 1)[0];
      if (tree.children) {
        tree.children = tree.children.concat(deletedItem.children || []);
      }
    } else {
      for (const child of children) {
        deleteItemAndMoveChildren(child, targetIdToDelete);
      }
    }
    setData(tree);
  }
  const TreeNode = ({ node }) => (
    <>
      {!isEmpty(data) ? (
        <div>
          <div
            style={{
              backgroundColor: "lightgray",
              width: "50%",
              padding: "3px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "25px",
            }}
          >
            <p
              onClick={() => {
                showAddButtonHandler(node.id);
                showAddinputHandler(false);
              }}
            >
              {node.name}
            </p>
            <button
              onClick={() => {
                deleteItemAndMoveChildren(
                  JSON.parse(localStorage.getItem("cards")),
                  node.id
                );
                deleteparent(
                  JSON.parse(localStorage.getItem("cards")),
                  node.id
                );
              }}
              style={{ width: "50px", height: "fit-content" }}
            >
              Delete
            </button>
          </div>
          {showAddButton[node.id] && (
            <button onClick={() => showAddinputHandler(node.id)}>Add</button>
          )}
          {showAddinput[node.id] && (
            <div>
              <form
                onSubmit={(e) => {
                  addChildToParent(e, node.id);
                }}
              >
                <input type="text" />
                <input type="submit" />
              </form>
            </div>
          )}
          {node.children && (
            <ul>
              {node.children.map((child, index) => (
                <li key={index} style={{ marginTop: "10px" }}>
                  <TreeNode node={child} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Empty</p>
      )}
    </>
  );

  function adddata(e) {
    e.preventDefault();
    if (e.target[0].value == "") {
      return;
    }
    setData({ id: uid(), name: e.target[0].value });
  }

  return (
    <div>
      <form
        style={{ marginBottom: "10px" }}
        onSubmit={(e) => {
          adddata(e);
        }}
      >
        <input type="text" />
        <input type="submit" />
      </form>
      <TreeNode node={data} />
    </div>
  );
};

export default App;
