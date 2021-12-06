import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("61a48b1362b112055163b916");

  const signup = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        { email, password, role }
      );
      console.log(result.data);
      alert("Successful registering");
    } catch (err) {
      alert("Unsuccessful registering");
    }
  };

  return (
    <div>
      <h1>signup</h1>
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

      <select
        name="city"
        id="cities"
        onChange={(e) => {
          if (e.target.value === "user") setRole("61a48b1362b112055163b916");
          else setRole("61a48ba362b112055163b918");
        }}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button onClick={() => signup()}> register </button>
    </div>
  );
}
