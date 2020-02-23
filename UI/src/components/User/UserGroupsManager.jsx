import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

function fetchFromServer(path) {
  return axios
    .get("http://localhost:8081/Gentoo/api" + path)
    .then(resp => resp.data);
}

const UserGroupsManager = props => {
  const { currentUsername } = useMyData();
  const [user, setUser] = useState("loading");
  const [userGroups, setUserGroups] = useState("loading");
  const [nonUserGroups, setNonUserGroups] = useState("loading");
  const [saving, setSaving] = useState(false);

  const selectedUser = props.match.params.userid;

  useEffect(
    function() {
      fetchFromServer("/users/" + selectedUser).then(setUser);
    },
    [selectedUser]
  );

  const updateCachedData = () => {
    fetchFromServer("/users/" + selectedUser + "/groups").then(setUserGroups);
    fetchFromServer(`/groups/userdoenstbelong/${selectedUser}`).then(
      setNonUserGroups
    );
  };
  useEffect(updateCachedData, []);

  function userChange(f) {
    setSaving(true);
    f()
      .then(updateCachedData)
      .then(() => setSaving(false));
  }

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

  const userGroupList = userGroups.map((group, index) => {
    function removeUserGroup() {
      userChange(() =>
        axios.delete(
          `http://localhost:8081/Gentoo/api/groups/${group.id}/users/${selectedUser}`
        )
      );
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
      userChange(() =>
        axios.post(
          `http://localhost:8081/Gentoo/api/groups/${group.id}/users/${selectedUser}`
        )
      );
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
      {saving ? (
        <span style={{ color: "white", position: "absolute", zIndex: 999 }}>
          Saving changes...
        </span>
      ) : null}
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
