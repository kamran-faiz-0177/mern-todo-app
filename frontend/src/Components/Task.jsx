import React, { useState, useEffect } from 'react';
import api_url from '../api_url';

const Task = () => {
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const UpdateTask = (title, id, done) => {
    setTitle(title);
    setIsDone(done);
    setUpdateId(id);
  };

  const FetchTasks = async () => {
    try {
      const res = await fetch(`${api_url}/api/user/fetch`);
      const { success, tasks, error, message } = await res.json();
      if (success) setTaskList(tasks);
      else console.error("Fetch error:", error || message);
    } catch (err) {
      console.error("Fetch exception:", err.message);
    }
  };

  useEffect(() => { FetchTasks(); }, []);

  const AddTask = async () => {
    if (!title.trim()) {
      console.warn("Title can't be empty");
      return;
    }

    try {
      if (updateId) {
        const res = await fetch(`${api_url}/api/user/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: updateId, title, isDone })
        });
        const { success, task: updatedTask, message, error } = await res.json();
        if (success) {
          setTaskList(prev =>
            prev.map(t => t._id === updatedTask._id ? updatedTask : t)
          );
          setUpdateId(null);
          setTitle("");
          FetchTasks();
        } else {
          console.error("Update failed:", error || message);
        }
      } else {
        const res = await fetch(`${api_url}/api/user/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, isDone })
        });
        const { success, task, message, error } = await res.json();
        if (success) {
          setTaskList(prev => [...prev, task]);
          setTitle("");
        } else {
          console.error("Create failed:", error || message);
        }
      }
    } catch (err) {
      console.error("Error in AddTask:", err.message);
    }
  };

  const DeleteTask = async (id) => {
    try {
      const res = await fetch(`${api_url}/api/user/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const { success, task: newList, message, error } = await res.json();
      if (success) setTaskList(newList);
      else console.error("Delete failed:", error || message);
    } catch (err) {
      console.error("Delete exception:", err.message);
    }
  };

  const CheckUncheck = async (id, title, done) => {
    try {
      const res = await fetch(`${api_url}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, isDone: !done })
      });
      const { success, task: updatedTask, message, error } = await res.json();
      if (success) {
        setTaskList(prev =>
          prev.map(t => t._id === updatedTask._id ? updatedTask : t)
        );
        FetchTasks();
      } else {
        console.error("Check/Uncheck failed:", error || message);
      }
    } catch (err) {
      console.error("Check/Uncheck exception:", err.message);
    }
  };

  return (
    <div className="w-[50%] mx-auto mt-10 text-center">
      <h1 className="font-bold text-4xl">TASK MANAGER APP</h1>

      <div className="mt-10 flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Add or update a task"
          className="border w-72 p-2 rounded-md outline-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          className="bg-green-600 py-1 px-6 rounded-md text-white"
          onClick={AddTask}
        >
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        {taskList.map(val => (
          <div key={val._id} className="w-[65%] bg-gray-300 rounded-lg p-4 flex items-center justify-between">
            <p className={val.isDone ? "line-through" : ""}>{val.title}</p>
            <div className="flex gap-2">
              <button
                className="bg-green-600 px-3 py-1 rounded text-white"
                onClick={() => CheckUncheck(val._id, val.title, val.isDone)}
              >
                {val.isDone ? "Undo" : "Done"}
              </button>
              <button
                className="bg-blue-600 px-3 py-1 rounded text-white"
                onClick={() => UpdateTask(val.title, val._id, val.isDone)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={() => DeleteTask(val._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
