import React, { Component } from "react";
import axios from "axios";
import AddDoctypeFormComponent from "./AddDoctypeFormComponent";
import ApiUrl from "../../APIURL";
import swal from '@sweetalert/with-react';

class AddDoctypeFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      doctype: {
        title: ""
      }
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    let data = {
      title: this.state.title
    };
    axios
      .post(`${ApiUrl}doctypes`, data)
      .then(response => {
        swal({
          text: "Jūs sėkmingai sukūrėte dokumentų tipą: " + this.state.title,
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true,
          }
        });
        this.props.history.push("/Gentoo/admin/doctypes");
      })
      .catch(error => {
        swal({
          text: "Dokumentų tipo sukurti nepavyko.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true,
          }
        });
      });
    event.preventDefault();
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/doctypes`);
  };

  render() {
    return (
      <AddDoctypeFormComponent
        title={this.state.title}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onBack={this.onBack}
      />
    );
  }
}

export default AddDoctypeFormContainer;
