import React, { Component } from "react";
import axios from "axios";
import EditDoctypeFormComponent from "./EditDoctypeFormComponent";
import { AppDataContext } from "../../context";

class EditDoctypeFormContainer extends Component {
  static contextType = AppDataContext;
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    this.getDoctype();
  }

  getDoctype = () => {
    axios
      .get(`${(this.context.apiUrl, this.props.match.params.title)}`)
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        alert("Tokio dokumentų tipo nėra.");
      });
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .put(
        `${this.context.apiUrl}doctypes/
          ${this.props.match.params.title}`,
        {
          title: this.state.title
        }
      )
      .then(() => {
        alert("Dokumentų tipo duomenys atnaujinti sėkmingai.");
        this.props.history.push("/Gentoo/admin/doctypes");
      })
      .catch(function(error) {
        alert(
          "Dokumentų tipo duomenų išsaugoti nepavyko. Bandykite dar kartą."
        );
      });
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/doctypes`);
  };

  render() {
    return (
      <div>
        <EditDoctypeFormComponent
          title={this.state.title}
          onBack={this.onBack}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default EditDoctypeFormContainer;
