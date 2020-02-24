import React, { Component } from "react";
import axios from "axios";
import AddDoctypeFormComponent from "./AddDoctypeFormComponent";
import ApiUrl from "../../APIURL";

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
        alert("Jūs sėkmingai sukūrėte dokumentų tipą: " + this.state.title);
        this.props.history.push("/Gentoo/admin/doctypes");
      })
      .catch(error => {
        alert("Dokumentų tipo sukurti nepavyko.");
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
