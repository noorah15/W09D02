import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";
import AdminTask from "./components/AdminTask";
import axios from "axios";

function App() {
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRoles();
  }, [login]);

  const getRoles = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getRoles`
      );

      const role = localStorage.getItem("role");

      const found = result.data.find((item) => {
        return item._id === role;
      });
      if (!found) return;
      if (found.role === "admin") setRole("admin");
      else setRole("user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!login ? (
        <>
          <Signup />
          <br />
          <hr />
          <br />
          <Login setLogin={setLogin} />
        </>
      ) : (
        <>
          {role === "user" ? <Tasks /> : <AdminTask />}

          <button
            onClick={() => {
              setLogin(false);
              localStorage.clear();
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
