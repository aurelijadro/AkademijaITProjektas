import React, { Component } from "react";
import axios from "axios";
import EditGroupFormComponent from "./EditGroupFormComponent";

class EditGroupFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    this.getGroup();
  }

  getGroup = () => {
    axios
      .get(
        "http://localhost:8081/Gentoo/api/groups/" +
          this.props.match.params.title
      )
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        alert("Tokios grupės nėra.");
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
        "http://localhost:8081/Gentoo/api/groups/" +
          this.props.match.params.title,
        {
          title: this.state.title
        }
      )
      .then(() => {
        alert("Grupės duomenys atnaujinti sėkmingai.");
        this.props.history.push("/Gentoo/admin/groups");
      })
      .catch(function(error) {
        alert("Grupės duomenų išsaugoti nepavyko. Bandykite dar kartą.");
      });
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/groups`);
  };

  render() {
    return (
      <div>
        <EditGroupFormComponent
          title={this.state.title}
          onBack={this.onBack}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default EditGroupFormContainer;
