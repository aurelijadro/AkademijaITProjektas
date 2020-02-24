import React, { Component } from "react";
import axios from "axios";
import DocTypeComponent from "./DocTypeComponent";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";
import ApiUrl from "../../APIURL";

class DocTypeList extends Component {
  constructor() {
    super();
    this.state = { doctypes: [] };
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
        alert("Nėra galimybės pateikti duomenų apie dokumentų tipus.");
      });
  };

  render() {
    let doctype = this.state.doctypes.map((doctype, index) => {
      return (
        <DocTypeComponent
          key={index}
          index={index}
          id={doctype.id}
          title={doctype.title}
        />
      );
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
                <th scope="col">Administruoti dokumentų tipus</th>
              </tr>
            </thead>
            <tbody>{doctype}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DocTypeList;
