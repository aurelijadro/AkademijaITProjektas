import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useMyData } from "../context";

axios.defaults.withCredentials = true;
const Login = withRouter(({ history, ...props }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUsername } = useMyData();

  const handleSubmit = event => {
    event.preventDefault();
    let userData = new URLSearchParams();
    userData.append("username", username);
    userData.append("password", password);
    axios
      .post("http://localhost:8081/Gentoo/login", userData, {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        const role = resp.data.role.toLowerCase();
        history.push("/Gentoo/" + role);
      })
      .catch(e => {
        alert("Neteisingai suvesti duomenys. Bandykite dar kartą.");
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
});

export default Login;
