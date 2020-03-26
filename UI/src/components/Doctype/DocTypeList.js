import React, { Component } from "react";
import axios from "axios";
import DocTypeComponent from "./DocTypeComponent";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";
import ApiUrl from "../../APIURL";
import swal from "@sweetalert/with-react";

class DocTypeList extends Component {
  constructor() {
    super();
    this.state = {
      doctypes: [],
      currentPage: 1,
      doctypesPerPage: 10
    };
  }

  componentDidMount() {
    this.getDoctypes();
  }

  getDoctypes = () => {
    axios
      .get(`${ApiUrl}doctypes`)
      .then(response => {
        this.setState({ doctypes: response.data });
      })
      .catch(error => {
        swal({
          text: "Nėra galimybės pateikti duomenų apie dokumentų tipus.",
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

  handlePageChange = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

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
    const { currentPage, doctypesPerPage } = this.state;
    const indexOfLastDoctype = currentPage * doctypesPerPage;
    const indexOfFirstDoctype = indexOfLastDoctype - doctypesPerPage;
    const currentDoctype = this.state.doctypes.slice(
      indexOfFirstDoctype,
      indexOfLastDoctype
    );
    let doctype = currentDoctype.map((doctype, index) => {
      return (
        <DocTypeComponent
          key={index}
          index={index}
          id={doctype.id}
          title={doctype.title}
        />
      );
    });
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.doctypes.length / doctypesPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number, index) => {
      if (
        number === this.state.currentPage - 1 ||
        number === this.state.currentPage ||
        number === this.state.currentPage + 1
      ) {
        return (
          <button
            className="btn btn-dark"
            key={index}
            id={number}
            onClick={this.handlePageChange}
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
        <div className="container ">
          <Link to="/Gentoo/admin/doctypes/add">
            <button
              type="button"
              className="btn btn-dark my-4"
              onClick={this.props.onAddNew}
            >
              Pridėti naują dokumentų tipą
            </button>
          </Link>
          <table className=" text-center table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Dokumentų tipo pavadinimas</th>
                <th scope="col" colSpan="2">
                  Veiksmai su dokumentų tipais
                </th>
              </tr>
            </thead>
            <tbody>{doctype}</tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="btn btn-dark mx-1" onClick={this.handlePreviousClick} aria-disabled={this.state.disabled}>&laquo;</button>
              </li>
              <li className="page-item">{renderPageNumbers}</li>
              <li className="page-item">
                <button className="btn btn-dark mx-1" onClick={this.handleNextClick} aria-disabled={this.state.disabled}>&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default DocTypeList;
