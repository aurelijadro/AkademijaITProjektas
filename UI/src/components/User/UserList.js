import React, { Component } from "react";
import axios from "axios";
import UserComponent from "./UserComponent";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";
import ApiUrl from "../../APIURL";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 10,
      disabled: true,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get(`${ApiUrl}users`)
      .then(response => {
        this.setState({
          users: response.data,
        });
      })
      .catch(error => {
        alert("Nėra galimybės pateikti duomenų apie vartotojus.");
      });
  };

  handlePageChange = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handlePreviousClick = (e) => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        disabled: false
      })
    } else {
      this.setState({ disabled: true })
    }
  }

  handleNextClick = (e) => {
    if (this.state.currentPage < this.state.users.length / 10) {
      this.setState({ currentPage: this.state.currentPage + 1 })
    } else {
      this.setState({ disabled: true })
    }
  }

  render() {
    const { currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = this.state.users.slice(indexOfFirstUser, indexOfLastUser);
    let user = currentUser.map((user, index) => {
      return (
        <UserComponent
          key={user.id}
          id={user.id}
          username={user.username}
          name={user.name}
          surname={user.surname}
          index={index}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number, index) => {
      if (
        (number === this.state.currentPage - 1 || number === this.state.currentPage || number === this.state.currentPage + 1)
      ) {
        return (
          <button className="btn btn-dark" key={index} id={number} onClick={this.handlePageChange}>{number}</button>
        )
      } else {
        return (
          <div key={index}></div>
        );
      }
    });
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <NavigationForAdmin />
            </div>
          </div>
        </div>
        <div className="container">
          <Link to="/Gentoo/admin/users/add">
            <button
              type="button"
              className="btn btn-dark my-4"
              onClick={this.props.onAddNew}
            >
              Pridėti naują vartotoją
            </button>
          </Link>
          <table className=" text-center table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Prisijungimo vardas</th>
                <th scope="col">Vardas</th>
                <th scope="col">Pavardė</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{user}</tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="btn btn-dark mx-1" onClick={this.handlePreviousClick} aria-disabled={this.state.disabled}>&laquo;</button>
              </li>
              <li className="page-item">
                {renderPageNumbers}
              </li>
              <li className="page-item">
                <button className="btn btn-dark mx-1" onClick={this.handleNextClick} aria-disabled={this.state.disabled}>&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div >
    );
  }
}

export default UserList;
