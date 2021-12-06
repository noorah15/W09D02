import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  setTasks,
  addTaskReducers,
  updateTaskReducers,
} from "./../../reducers/tasks";
import { useDispatch, useSelector } from "react-redux";

export default function Tasks() {
  const [createTask, setCreateTask] = useState(1);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    getAllItems();
  }, [createTask]);

  const getAllItems = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/task/todos/${userId}`,
        {
          params: { userId: userId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const data = {
        items: result.data,
      };

      dispatch(setTasks(data));
      //console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const id = localStorage.getItem("ID");
      console.log("the s  " + state.tasks.taskAdd);
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/task/create`,
        { name: state.tasks.taskAdd, user: userId, userId, id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      //console.log(result.data);
      setCreateTask(createTask + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (taskId, userId) => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/task/todoUpdate`,
        { taskId, userId, taskName: state.tasks.taskUpdate, id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result.data);
      setCreateTask(createTask + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId, userId) => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/task/todoDel`,
        {
          data: { userId, taskId, id },
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result.data);
      setCreateTask(createTask + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>add task: </h1>
      <input
        type="text"
        name="task"
        onChange={(e) => {
          const data = {
            items1: state.tasks.items,
            taskAdd: e.target.value,
          };
          dispatch(addTaskReducers(data));
        }}
      />
      <button onClick={() => addTask()}> Add </button>

      <h1>Tasks</h1>
      {state.tasks.items.map((item) => (
        <>
          <h1>{item.name}</h1>
          <input
            type="text"
            name="task"
            onChange={(e) => {
              const data = {
                items2: state.tasks.items,
                taskUpdate: e.target.value,
              };
              dispatch(updateTaskReducers(data));
            }}
          />
          <button onClick={() => updateTask(item._id, item.user)}>
            {" "}
            update{" "}
          </button>
          <button onClick={() => deleteTask(item._id, item.user)}>
            {" "}
            delete{" "}
          </button>
        </>
      ))}
    </div>
  );
}
