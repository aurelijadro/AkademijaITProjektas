import React, { Component } from "react";
import NavigationForUser from "./NavigationForUser";
import axios from "axios";
import ApiUrl from "../APIURL";

import CreatedDocuments from "../userComponents/CreatedDocuments";

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
      </div>
    );
  }
}

export default UserDashboard;
