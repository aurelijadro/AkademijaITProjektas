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
      currentPage: 0,
      disabledNext: false,
      disabledBack: true,
      searchText: "",
      usersCount: 0,
      numOfPages: 0,
      loading: true
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .put(
        `${ApiUrl}users/search/${this.state.currentPage}`,
        this.state.searchText,
        {
          headers: { "Content-Type": "text/plain" }
        }
      )
      .then(response => {
        this.setState({
          users: response.data.users,
          usersCount: response.data.usersCount,
          numOfPages: Math.ceil(response.data.usersCount / 15)
        });
      })
      .catch(error => {
        alert("Nėra galimybės pateikti duomenų apie vartotojus.");
      });
  };

  setCurrentPage = num => {
    this.setState({ currentPage: num }, () => this.getUsers());
  };

  handlePreviousClick = e => {
    if (this.state.currentPage === 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1,
          disabledBack: true
        },
        () => this.getUsers()
      );
    }
    if (this.state.currentPage > 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1,
          disabledBack: false
        },
        () => this.getUsers()
      );
    }
  };

  handleNextClick = e => {
    if (this.state.currentPage === this.state.numOfPages - 1) {
      return;
    }
    if (this.state.currentPage + 1 === this.state.numOfPages - 1) {
      this.setState(
        {
          currentPage: this.state.currentPage + 1,
          disabledNext: true
        },
        () => this.getUsers()
      );
    } else if (this.state.currentPage < this.state.numOfPages) {
      this.setState(
        { currentPage: this.state.currentPage + 1, disabledNext: false },
        () => this.getUsers()
      );
    }
  };

  render() {
    const user = this.state.users.map((user, index) => {
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
    for (let i = 1; i <= this.state.numOfPages; i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number, index) => {
      const handlePageChange = () => this.setCurrentPage(index);

      if (
        number === this.state.currentPage ||
        number === this.state.currentPage + 1 ||
        number === this.state.currentPage + 2
      ) {
        return (
          <button
            className="btn btn-dark mx-2"
            key={index}
            id={index}
            onClick={handlePageChange}
          >
            {number}
          </button>
        );
      } else {
        return <div key={index}></div>;
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
                <button
                  className="btn btn-dark mx-1"
                  onClick={this.handlePreviousClick}
                  aria-disabled={this.state.disabledBack}
                >
                  &laquo;
                </button>
              </li>
              <li className="page-item">{renderPageNumbers}</li>
              <li className="page-item">
                <button
                  className="btn btn-dark mx-1"
                  onClick={this.handleNextClick}
                  aria-disabled={this.state.disabledNext}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default UserList;
