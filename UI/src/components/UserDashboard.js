import React, { Component } from "react";
import NavigationForUser from "./NavigationForUser";
import axios from "axios";
import ApiUrl from "../APIURL";
import swal from "sweetalert";
import CreatedDocuments from "../userComponents/AllUserDocumentsOverview";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: -2, isModerator: "" };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    axios.get(`${ApiUrl}loggedUserId`).then(resp => {
      this.setState({ userId: resp.data });

      axios
        .get(`${ApiUrl}users/${this.state.userId}/ismoderator`)
        .then(resp => this.setState({ isModerator: resp.data }));
    });
  }

  downloadAllInfo = () => {
    fetch(`${ApiUrl}files/${this.state.userId}/downloadZip`)
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "Info.zip";
          a.click();
        });
      })
      .catch(error => {
        swal({
          text: "Nėra dokumentų, kuriuos gaite atsisiųsti.",
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

  render() {
    if (this.state.userId === -2) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <NavigationForUser isModerator={this.state.isModerator} />
        <div className="container my-4">
          <CreatedDocuments id={this.state.userId} />
        </div>
        <div className="container my-4">
          <button
            className="btn btn-dark"
            id="bigButton"
            onClick={this.downloadAllInfo}
          >
            Atsisiųsti informaciją apie dokumentus ir visus prisegtus PDF failus
            zip formatu
          </button>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
