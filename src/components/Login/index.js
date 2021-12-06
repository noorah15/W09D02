import React, { useState, useEffect } from "react";
import axios from "axios";
import { login2 } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const login = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        { email, password }
      );

      const data = {
        token: result.data.token,
        role: result.data.result.role,
        ID: result.data.result._id,
      };

      dispatch(login2(data));
      // console.log(data);

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
