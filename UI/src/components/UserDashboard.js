import React, { Component } from "react";
import NavigationForUser from "./NavigationForUser";
import axios from "axios";
import ApiUrl from "../APIURL";
//import MainDocumentListForDashboard from "./Document/MainDocumentListForDashboard";

import CreatedDocuments from "../userComponents/CreatedDocuments";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: -2 };
  }

  componentDidMount() {
    this.getUserId();
  }

  getUserId() {
    axios
      .get(`${ApiUrl}loggedUserId`)
      .then(resp => this.setState({ userId: resp.data }));
  }

  render() {
    if (this.state.userId === -2) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <NavigationForUser />
        <div className="container my-4">
          <CreatedDocuments id={this.state.userId} />
        </div>
      </div>
    );
  }
}

export default UserDashboard;
