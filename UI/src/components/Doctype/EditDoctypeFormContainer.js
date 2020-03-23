import React, { Component } from "react";
import axios from "axios";
import EditDoctypeFormComponent from "./EditDoctypeFormComponent";
import ApiUrl from "../../APIURL";
import swal from "@sweetalert/with-react";

class EditDoctypeFormContainer extends Component {
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
      .get(`${ApiUrl}doctypes/${this.props.match.params.doctypeid}`)
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        swal({
          text: "Tokio dokumentų tipo nėra.",
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

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .put(
        `${ApiUrl}doctypes/
          ${this.props.match.params.doctypeid}`,
        {
          title: this.state.title
        }
      )
      .then(() => {
        swal({
          text: "Dokumentų tipo duomenys atnaujinti sėkmingai.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
        this.props.history.push("/Gentoo/admin/doctypes");
      })
      .catch(function(error) {
        swal({
          text:
            "Dokumentų tipo duomenų išsaugoti nepavyko. Bandykite dar kartą.",
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
