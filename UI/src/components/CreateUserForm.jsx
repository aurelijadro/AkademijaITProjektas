import React, { Component } from 'react';
import axios from 'axios';

class CreateUserForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: '',
      url: "http://localhost:8080"
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { name, surname, username, password, url } = this.state;
    axios.post(`${url}/api/users`, { name, surname, username, password })
      .then((result) => {
        this.props.history.push("/")
      });
  }
  render() {
    const { name, surname, username, password } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
                Create New User
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" required />
              </div>
              <div class="form-group">
                <label for="surname">Surname:</label>
                <input type="text" class="form-control" name="surname" value={surname} onChange={this.onChange} placeholder="Surname" required />
              </div>
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" name="username" value={username} onChange={this.onChange} placeholder="Username" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" required />
              </div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserForm;