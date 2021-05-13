import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(
    () => {
      if (result.data) {
        const token = result.data.login.value;
        setToken(token);
        localStorage.setItem("user-token", token);
      }
    }, // eslint-disable-next-line
    [result.data]
  );

  function handleLogin(event) {
    event.preventDefault();
    login({ variables: { username, password } });
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;
