import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";
import AdminTask from "./components/AdminTask";
import axios from "axios";
import { login2, logout2 } from "./reducers/login";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  return (
    <>
      {!localStorage.getItem("ID") ? (
        <>
          <Signup />
          <br />
          <hr />
          <br />
          <Login />
        </>
      ) : (
        <>
          {localStorage.getItem("role") === "61a48b1362b112055163b916" ? (
            <Tasks />
          ) : (
            <AdminTask />
          )}

          <button
            onClick={() => {
              const data = {
                token: "",
                role: "",
                ID: "",
              };

              dispatch(logout2(data));
            }}
          >
            logout{" "}
          </button>
        </>
      )}
    </>
  );
}

export default App;
