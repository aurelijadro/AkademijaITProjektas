import React, { Component } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import ApiUrl from "../../APIURL";
import swal from "sweetalert";

class EditFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      username: "",
      password: "",
      role: "USER",
      nameError: "",
      surnameError: "",
      usernameError: "",
      passwordError: ""
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get(`${ApiUrl}users/${this.props.match.params.userid}`)
      .then(response => {
        this.setState(response.data);
        this.setState({ password: "" });
      })
      .catch(error => {
        swal({
          text: "Nėra galimybės pateikti duomenų apie vartotoją.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
      });
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/users`);
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value }, () => {
      this.validateName();
    });
  };

  handleSurnameChange = e => {
    this.setState({ surname: e.target.value }, () => {
      this.validateSurname();
    });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value }, () => {
      this.validateUsername();
    });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value }, () => {
      this.validatePassword();
    });
  };

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  validateName = () => {
    const { name } = this.state;
    this.setState({
      nameError:
        name.length >= 2
          ? null
          : "Vardas turi būti sudarytas iš 2 arba daugiau simbolių"
    });
  };

  validateSurname = () => {
    const { surname } = this.state;
    this.setState({
      surnameError:
        surname.length >= 2
          ? null
          : "Pavardė turi būti sudarytas iš 2 arba daugiau simbolių"
    });
  };

  validateUsername = () => {
    const { username } = this.state;
    this.setState({
      usernameError:
        username.length >= 2
          ? null
          : "Vartotojo vardas turi būti sudarytas iš 2 arba daugiau simbolių"
    });
  };

  validatePassword = () => {
    const { password } = this.state;
    this.setState({
      passwordError:
        password.length >= 8 && password.length <= 32
          ? null
          : "Slaptažodis turi būti sudarytas nuo 8 iki 32 simbolių"
    });
  };
  onSubmit = event => {
    event.preventDefault();
    axios
      .put(`${ApiUrl}users/${this.props.match.params.userid}`, {
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
      })
      .then(() => {
        swal({
          text: "Jūs sėkmingai pakeitėte vartotojo duomenis.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
        this.props.history.push("/Gentoo/admin/users");
      })
      .catch(function (error) {
        swal({
          text: "Toks vartotojo vardas jau egzistuoja.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
      });
  };

  render() {
    const { name, surname, username, password, role } = this.state;
    const isEnabled =
      password.length >= 8 &&
      password.length <= 32 &&
      name.length >= 2 &&
      surname.length >= 2 &&
      username.length >= 2;
    return (
      <div>
        <NavigationForAdmin></NavigationForAdmin>
        <div className="container my-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Vartotojo paskyros atnaujinimas</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Vardas:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.nameError ? "is-invalid" : ""
                      }`}
                    name="name"
                    value={name}
                    onChange={this.handleNameChange}
                    onBlur={this.validateName}
                    placeholder="Vardas"
                    required
                  />
                  <div className="invalid-feedback">{this.state.nameError}</div>
                </div>
                <div className="form-group">
                  <label>Pavardė:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.surnameError ? "is-invalid" : ""
                      }`}
                    name="surname"
                    value={surname}
                    onChange={this.handleSurnameChange}
                    onBlur={this.validateSurname}
                    placeholder="Pavardė"
                    required
                  />
                  <div className="invalid-feedback">
                    {this.state.surnameError}
                  </div>
                </div>
                <div className="form-group">
                  <label>Vartotojo vardas:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.usernameError ? "is-invalid" : ""
                      }`}
                    name="username"
                    value={username}
                    onChange={this.handleUsernameChange}
                    onBlur={this.validateUsername}
                    placeholder="Vartotojo vardas"
                    required
                  />
                  <div className="invalid-feedback">
                    {this.state.usernameError}
                  </div>
                </div>
                <div className="form-group">
                  <label>Slaptažodis:</label>
                  <input
                    type="password"
                    className={`form-control ${
                      this.state.passwordError ? "is-invalid" : ""
                      }`}
                    name="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    onBlur={this.validatePassword}
                    placeholder="********"
                    required
                  />
                  <div className="invalid-feedback">
                    {this.state.passwordError}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Pasirinkite vartotojo prieigos statusą:
                    <select
                      name="role"
                      value={role}
                      onChange={this.handleRoleChange}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </label>
                </div>
                <button
                  className="btn btn-dark"
                  type="submit"
                  disabled={!isEnabled}
                >
                  Pateikti
                </button>
                <button
                  className="btn mx-3 btn-dark"
                  onClick={() => this.props.history.push("/Gentoo/admin/users")}
                >
                  Atšaukti
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditFormContainer;
