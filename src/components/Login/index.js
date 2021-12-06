import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        { email, password }
      );
      console.log(result.data.result.role);
      console.log(result.data.result._id);
      setLogin(true);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("role", result.data.result.role);
      localStorage.setItem("ID", result.data.result._id);
      //console.log(localStorage.getItem("token"));
      alert("Successful login");
    } catch (err) {
      alert("Unsuccessful login");
    }
  };

  return (
    <div>
      <h1>login </h1>

      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => login()}> login </button>
    </div>
  );
}
