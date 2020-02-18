import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

const UserGroupsManager = props => {
  const { currentUsername } = useMyData();
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(
    function() {
      function updateUser() {
        console.log("curr username: ", currentUsername);
        axios
          .get("http://localhost:8081/Gentoo/api/users/" + currentUsername)
          .then(resp => setUser(resp.data))
          .catch(e => console.log(e));
      }
      updateUser();
    },
    [currentUsername]
  );

  useEffect(
    function() {
      function getUserGroups() {
        axios
          .get(
            "http://localhost:8081/Gentoo/api/users/" +
              currentUsername +
              "/groups"
          )
          .then(resp => setUserGroups(resp.data))
          .catch(e => console.log(e));
      }
      getUserGroups();
    },
    [currentUsername]
  );

  //console.log("user: ", user);
  console.log("current user name", currentUsername);
  if (currentUsername === "loading" || user === null)
    return <div>Loading...</div>;

  const heading = user.name + " " + user.surname + " priklauso šioms grupėms:";

  const updateUserGroups = () => {
    axios
      .get(
        "http://localhost:8081/Gentoo/api/users/" + currentUsername + "/groups"
      )
      .then(resp => setUserGroups(resp.data).catch(e => console.log(e)));
  };
  console.log("user groups: ", userGroups);
  const groupList = userGroups.map((group, index) => {
    function removeUserGroup() {
      axios
        .delete(
          `http://localhost:8081/Gentoo/api/groups/${group.title}/users/${currentUsername}`
        )
        .then(updateUserGroups);
    }
    return (
      <div className="row my-1" key={group.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{group.title}</div>
        <button className="col-3 btn btn-dark" onClick={removeUserGroup}>
          Pašalinti vartotoją iš grupės
        </button>
      </div>
    );
  });

  return (
    <div>
      <NavigationForAdmin />
      <div className="container">
        <h4>{heading}</h4>
        <div className="row my-2">
          <div className="col-3">#</div>
          <div className="col-6">Grupės pavadinimas</div>
          <div className="col-3"></div>
        </div>
        <div>{groupList}</div>
      </div>
    </div>
  );
};
export default UserGroupsManager;