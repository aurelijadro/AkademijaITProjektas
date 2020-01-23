import React, { useState } from "react";
import axios from "axios";
import { useMyData } from "../context";

export default function Login() {
  axios.defaults.withCredentials = true;

  const handleSubmit = event => {
    event.preventDefault();
    let userData = new URLSearchParams();
    userData.append("username", this.state.email);
    userData.append("password", this.state.pass);
    axios
      .post("http://localhost:8081/login", userData, {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        console.log("user " + resp.data.username + " logged in");
      })
      .catch(e => {
        console.log(e);
      });
    event.preventDefault();
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onPassChange = event => {
    this.setState({ pass: event.target.value });
  };
  onSubmit = event => {};

  return (
    <div className="row">
      <div className="col-3"></div>
      <form onSubmit={handleSubmit}>
        <div className="row my-3">
          <input
            type="text"
            required
            className="form-control col-4"
            placeholder="Vartotojo vardas"
            value={userName}
            onChange={event => setUserName(event.target.value)}
          ></input>
          <input
            type="text"
            required
            className="form-control col-4"
            placeholder="Slaptažodis"
            value={userName}
            onChange={event => setPassword(event.target.value)}
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
