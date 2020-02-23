import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

function useServerData(path, setterFunction) {
  useEffect(
    function() {
      axios
        .get("http://localhost:8081/Gentoo/api" + path)
        .then(resp => setterFunction(resp.data));
    },
    [path, setterFunction]
  );
}

const UserGroupsManager = props => {
  const { currentUsername } = useMyData();
  const [user, setUser] = useState("loading");
  const [userGroups, setUserGroups] = useState("loading");
  const [nonUserGroups, setNonUserGroups] = useState("loading");

  const selectedUser = props.match.params.userid;

  useServerData("/users/" + selectedUser, setUser);
  useServerData("/users/" + selectedUser + "/groups", setUserGroups);
  useServerData("/groups/userdoenstbelong/" + selectedUser, setNonUserGroups);

  if (
    currentUsername === "loading" ||
    user === "loading" ||
    userGroups === "loading" ||
    nonUserGroups === "loading"
  )
    return <div>Loading...</div>;

  const fullName = user.name + " " + user.surname;
  const heading = fullName + " priklauso šioms grupėms:";
  const heading2 = fullName + " gali būti priskirta šioms grupėms:";

  const updateUserGroups = () => {
    axios
      .get("http://localhost:8081/Gentoo/api/users/" + selectedUser + "/groups")
      .then(resp => setUserGroups(resp.data))
      .catch(e => console.log(e));
  };

  const updateNonUserGroups = () => {
    axios
      .get(
        `http://localhost:8081/Gentoo/api/groups/userdoenstbelong/${selectedUser}`
      )
      .then(resp => setNonUserGroups(resp.data))
      .catch(e => console.log(e));
  };

  const userGroupList = userGroups.map((group, index) => {
    function removeUserGroup() {
      axios
        .delete(
          `http://localhost:8081/Gentoo/api/groups/${group.id}/users/${selectedUser}`
        )
        .then(updateUserGroups)
        .then(updateNonUserGroups);
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

  const nonUserGroupList = nonUserGroups.map((group, index) => {
    function addUserToGroup() {
      axios
        .post(
          `http://localhost:8081/Gentoo/api/groups/${group.id}/users/${selectedUser}`
        )

        .then(updateUserGroups)
        .then(updateNonUserGroups);
    }
    return (
      <div className="row my-1" key={group.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{group.title}</div>
        <button className="col-3 btn btn-dark" onClick={addUserToGroup}>
          Pridėti vartotoją į grupę
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
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">Grupės pavadinimas</div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{userGroupList}</div>
        <hr></hr>
        <h4>{heading2}</h4>
        <div className="row my-2">
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">Grupės pavadinimas</div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{nonUserGroupList}</div>
      </div>
    </div>
  );
};
export default UserGroupsManager;
