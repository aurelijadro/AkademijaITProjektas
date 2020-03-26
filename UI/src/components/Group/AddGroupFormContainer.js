import React, { Component } from "react";
import axios from "axios";
import AddGroupFormComponent from "./AddGroupFormComponent";
import ApiUrl from "../../APIURL";
import swal from "@sweetalert/with-react";

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
        swal({
          text: "Jūs sėkmingai sukūrėte grupę: " + this.state.title,
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
        this.props.history.push("/Gentoo/admin/groups");
      })
      .catch(error => {
        swal({
          text: "Grupės sukurti nepavyko.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
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
