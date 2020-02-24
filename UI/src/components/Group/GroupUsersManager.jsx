import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";
import ApiUrl from "../../APIURL";

const GroupUsersManager = props => {
  const { currentUsername } = useMyData();
  const [groupUsers, setGroupUsers] = useState("loading");
  const [nonGroupUsers, setNonGroupUsers] = useState("loading");
  const [selectedGroup, setSelectedGroup] = useState("loading");
  const [saving, setSaving] = useState(false);

  const groupId = props.match.params.groupid;

  function fetchFromServer(path) {
    return axios.get(ApiUrl + path).then(resp => resp.data);
  }

  const updateCachedData = () => {
    fetchFromServer(`groups/${groupId}/users`).then(setGroupUsers);
    fetchFromServer(`groups/${groupId}/usersnotingroup`).then(setNonGroupUsers);
  };

  useEffect(
    function getGroupInfo() {
      axios
        .get(`${ApiUrl}groups/${groupId}`)
        .then(resp => setSelectedGroup(resp.data));
    },
    [groupId]
  );

  useEffect(function() {
    updateCachedData();
    // const timer = setInterval(updateCachedData, 2000);
    // return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userChange(f) {
    setSaving(true);
    f()
      .then(updateCachedData)
      .then(() => setSaving(false));
  }

  if (
    currentUsername === "loading" ||
    selectedGroup === "loading" ||
    groupUsers === "loading" ||
    nonGroupUsers === "loading"
  )
    return <div>Loading...</div>;

  const groupUsersList = groupUsers.map((user, index) => {
    function removeGroupUser() {
      userChange(() =>
        axios.delete(`${ApiUrl}groups/${groupId}/users/${user.id}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={user.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{user.name + " " + user.surname}</div>
          <button className="col-3 btn btn-dark" onClick={removeGroupUser}>
            Pašalinti vartotoją iš grupės
          </button>
        </div>
      </li>
    );
  });

  const nonGroupUsersList = nonGroupUsers.map((user, index) => {
    function addGroupUser() {
      userChange(() =>
        axios.post(`${ApiUrl}groups/${groupId}/users/${user.id}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={user.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{user.name + " " + user.surname}</div>
          <button className="col-3 btn btn-dark" onClick={addGroupUser}>
            Pridėti vartotoją į grupę
          </button>
        </div>
      </li>
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
      <div className="container my-4">
        <h4>Grupei {selectedGroup.title} priklauso šie vartotojai:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">
              Vartotojo vardas ir pavardė
            </div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{groupUsersList}</div>
        <hr></hr>
        <h4>Kiti sistemoje registruoti vartotojai:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">
              Vartotojo vardas ir pavardė
            </div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{nonGroupUsersList}</div>
      </div>
    </div>
  );
};
export default GroupUsersManager;
