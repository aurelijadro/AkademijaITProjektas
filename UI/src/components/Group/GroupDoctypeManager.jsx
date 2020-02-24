import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

const GroupUsersManager = props => {
  const { currentUsername } = useMyData();
  const [groupUsers, setGroupUsers] = useState([]);
  const [nonGroupUsers, setNonGroupUsers] = useState([]);

  const selectedGroup = props.match.params.grouptitle;

  const updateGroupUsers = () => {
    axios
      .get(`http://localhost:8081/Gentoo/api/groups/${selectedGroup}/users`)
      .then(resp => setGroupUsers(resp.data))
      .catch(e => console.log(e));
  };

  const updateNonGroupUsers = () => {
    axios
      .get(
        `http://localhost:8081/Gentoo/api/groups/${selectedGroup}/usersnotingroup`
      )
      .then(resp => setNonGroupUsers(resp.data))
      .catch(e => console.log(e));
  };

  useEffect(
    function() {
      function getGroupUsers() {
        axios
          .get(`http://localhost:8081/Gentoo/api/groups/${selectedGroup}/users`)
          .then(resp => setGroupUsers(resp.data))
          .catch(e => console.log(e));
      }
      getGroupUsers();
    },
    [selectedGroup]
  );

  useEffect(
    function() {
      function getNonGroupUsers() {
        axios
          .get(
            `http://localhost:8081/Gentoo/api/groups/${selectedGroup}/usersnotingroup`
          )
          .then(resp => setNonGroupUsers(resp.data))
          .catch(e => console.log(e));
      }
      getNonGroupUsers();
    },
    [selectedGroup]
  );

  if (currentUsername === "loading") return <div>Loading...</div>;

  const groupUsersList = groupUsers.map((user, index) => {
    function removeGroupUser() {
      axios
        .delete(
          `http://localhost:8081/Gentoo/api/groups/${selectedGroup}/users/${user.username}`
        )
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
        .post(
          `http://localhost:8081/Gentoo/api/groups/${selectedGroup}/users/${user.username}`
        )

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
        <h4>Grupei {selectedGroup} priklauso šie vartotojai:</h4>
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
        <Link to="/Gentoo/admin/groups">
              <button className="btn btn-primary" onClick={props.onBack}>
                Grįžti į grupių sąrašą
              </button>
            </Link>
      </div>
    </div>
  );
};
export default GroupUsersManager;