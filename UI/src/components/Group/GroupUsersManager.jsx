import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

const GroupUsersManager = props => {
  const { currentUsername, apiUrl } = useMyData();
  const [groupUsers, setGroupUsers] = useState([]);
  const [nonGroupUsers, setNonGroupUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Loading");

  const groupId = props.match.params.groupid;

  const updateGroupUsers = () => {
    axios
      .get(`${apiUrl}groups/${groupId}/users`)
      .then(resp => setGroupUsers(resp.data))
      .catch(e => console.log(e));
  };

  const updateNonGroupUsers = () => {
    axios
      .get(`${apiUrl}groups/${groupId}/usersnotingroup`)
      .then(resp => setNonGroupUsers(resp.data))
      .catch(e => console.log(e));
  };

  useEffect(
    function getGroupInfo() {
      axios
        .get(`${apiUrl}groups/${groupId}`)
        .then(resp => setSelectedGroup(resp.data));
    },
    [groupId, apiUrl]
  );

  useEffect(
    function getGroupUsers() {
      axios
        .get(`${apiUrl}groups/${groupId}/users`)
        .then(resp => setGroupUsers(resp.data));
    },
    [groupId, apiUrl]
  );

  useEffect(
    function getNonGroupUsers() {
      axios
        .get(`${apiUrl}groups/${groupId}/usersnotingroup`)
        .then(resp => setNonGroupUsers(resp.data))
        .catch(e => console.log(e));
    },
    [groupId, apiUrl]
  );

  if (currentUsername === "loading" || selectedGroup === "Loading")
    return <div>Loading...</div>;

  const groupUsersList = groupUsers.map((user, index) => {
    function removeGroupUser() {
      axios
        .delete(`${apiUrl}groups/${groupId}/users/${user.id}`)
        .then(updateGroupUsers)
        .then(updateNonGroupUsers);
    }
    return (
      <div className="row my-1" key={user.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{user.name + " " + user.surname}</div>
        <button className="col-3 btn btn-dark" onClick={removeGroupUser}>
          Pašalinti vartotoją iš grupės
        </button>
      </div>
    );
  });

  const nonGroupUsersList = nonGroupUsers.map((user, index) => {
    function addGroupUser() {
      axios
        .post(`${apiUrl}groups/${groupId}/users/${user.id}`)

        .then(updateGroupUsers)
        .then(updateNonGroupUsers);
    }
    return (
      <div className="row my-1" key={user.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{user.name + " " + user.surname}</div>
        <button className="col-3 btn btn-dark" onClick={addGroupUser}>
          Pridėti vartotoją į grupę
        </button>
      </div>
    );
  });

  return (
    <div>
      <NavigationForAdmin />
      <div className="container">
        <h4>Grupei {selectedGroup.title} priklauso šie vartotojai:</h4>
        <div className="row my-2">
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">
            Vartotojo vardas ir pavardė
          </div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{groupUsersList}</div>
        <hr></hr>
        <h4>Kiti sistemoje registruoti vartotojai:</h4>
        <div className="row my-2">
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">
            Vartotojo vardas ir pavardė
          </div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{nonGroupUsersList}</div>
      </div>
    </div>
  );
};
export default GroupUsersManager;
