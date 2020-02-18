import React from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

const UserGroupsManager = props => {
  const { loggedUser } = useMyData();

  const heading =
    loggedUser.name + " " + loggedUser.surname + " priklauso šioms grupėms:";

  const userGroups = axios.get(
    "http://localhost/8081/Gentoo/api/users/" + props.username + "/groups"
  );

  return (
    <div>
      <NavigationForAdmin />
      <div className="container">
        <h1>{heading}</h1>
      </div>
    </div>
  );
};
export default UserGroupsManager;
