import React, { Component } from "react";
import axios from "axios";
import GroupComponent from "./GroupComponent";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";
import ApiUrl from "../../APIURL";

class GroupList extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      currentPage: 1,
      groupsPerPage: 10
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    axios
      .get(`${ApiUrl}groups`)
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(error => {
        alert("Nėra galimybės pateikti duomenų apie grupes.");
      });
  };

  handlePageChange = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, groupsPerPage } = this.state;
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroup = this.state.groups.slice(indexOfFirstGroup, indexOfLastGroup);
    let group = currentGroup.map((group, index) => {
      return (
        <GroupComponent
          key={group.id}
          id={group.id}
          title={group.title}
          index={index}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.groups.length / groupsPerPage); i++) {
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
          <Link to="/Gentoo/admin/groups/add">
            <button
              type="button"
              className="btn btn-dark my-4"
              onClick={this.props.onAddNew}
            >
              Pridėti naują grupę
            </button>
          </Link>
          <table className=" text-center table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Grupės pavadinimas</th>
                <th scope="col" colSpan="2">
                  Grupės administravimo veiksmai
                </th>
              </tr>
            </thead>
            <tbody>{group}</tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                {renderPageNumbers}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default GroupList;
