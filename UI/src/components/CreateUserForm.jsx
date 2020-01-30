import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  onBack = (event) => {
    event.preventDefault();
    this.props.history.push(`/admin/users`);
  }

  render() {
    const { name, surname, username, password } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Sukurti naują vartotoją
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Vardas:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" required />
              </div>
              <div className="form-group">
                <label>Pavardė:</label>
                <input type="text" className="form-control" name="surname" value={surname} onChange={this.onChange} placeholder="Surname" required />
              </div>
              <div className="form-group">
                <label>Vartotojo vardas:</label>
                <input type="text" className="form-control" name="username" value={username} onChange={this.onChange} placeholder="Username" required />
              </div>
              <div className="form-group">
                <label>Slaptažodis:</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" required />
              </div>
              <button className="btn btn-primary" type="submit">Išsaugoti</button>
              <Link to="/admin/users"><button className="btn btn-primary" onClick={this.onBack}>Grįžti į vartotojų sąrašą</button></Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserForm;