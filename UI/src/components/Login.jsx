import React, { useState } from "react";
import axios from "axios";
import { useMyData } from "../context";
import { Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    let userData = new URLSearchParams();
    userData.append("username", username);
    userData.append("password", password);
    axios
      .post("http://localhost:8080/login", userData, {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        console.log("user logged in!");
        return <Redirect to="/admin" />;
      })
      .catch(e => {
        console.log(e);
      });
    event.preventDefault();
  };

  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <form onSubmit={handleSubmit}>
        <div className="row my-3">
          <input
            type="text"
            required
            value={username}
            className="form-control col-4"
            placeholder="Vartotojo vardas"
            onChange={event => onUsernameChange(event)}
          ></input>
          <input
            type="password"
            required
            value={password}
            className="form-control col-4"
            placeholder="Slaptažodis"
            onChange={event => onPasswordChange(event)}
          ></input>
          <button className="btn btn-dark col-4" type="submit">
            Prisijungti
          </button>
        </div>
      </form>
      <div className="col-3"></div>
    </div>
  );
}
