import React, { Component } from "react";
import axios from "axios";
import AddGroupFormComponent from "./AddGroupFormComponent";
import ApiUrl from "../../APIURL";

class AddGroupFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const data = {
      title: this.state.title
    };
    axios
      .post(`${ApiUrl}groups`, data)
      .then(response => {
        alert("Jūs sėkmingai sukūrėte grupę: " + this.state.title);
        this.props.history.push("/Gentoo/admin/groups");
      })
      .catch(error => {
        alert("Grupės sukurti nepavyko.");
      });
    event.preventDefault();
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/groups`);
  };

  render() {
    return (
      <AddGroupFormComponent
        title={this.state.title}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onBack={this.onBack}
      />
    );
  }
}

export default AddGroupFormContainer;
