import React, { Component } from "react";
import axios from "axios";
import GroupComponent from "./GroupComponent";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";

class GroupList extends Component {
  constructor() {
    super();
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    axios
      .get("http://localhost:8081/Gentoo/api/groups")
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(error => {
        alert("Nėra galimybės pateikti duomenų apie grupes.");
      });
  };

  render() {
    let group = this.state.groups.map((group, index) => {
      return (
        <GroupComponent
          key={group.id}
          id={group.id}
          title={group.title}
          index={index}
        />
      );
    });
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <NavigationForAdmin />
            </div>
          </div>
        </div>
        <div className="container">
          <Link to="/Gentoo/admin/groups/add">
            <button
              type="button"
              className="btn btn-dark my-4"
              onClick={this.props.onAddNew}
            >
              Pridėti naują grupę
            </button>
          </Link>
          <table className=" text-center table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Grupės pavadinimas</th>
                <th scope="col" colSpan="2">
                  Grupės administravimo veiksmai
                </th>
              </tr>
            </thead>
            <tbody>{group}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default GroupList;
