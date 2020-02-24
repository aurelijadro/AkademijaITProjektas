import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";

const GroupDocsManager = props => {
  const { currentUsername } = useMyData();
  const [groupDoctypes, setGroupDoctypes] = useState([]);
  const [nonGroupDoctypes, setNonGroupDoctypes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Loading");

  const groupId = props.match.params.groupid;
  console.log("group id: ", groupId);

  const updateGroupDoctypes = () => {
    axios
      .get(`http://localhost:8081/Gentoo/api/groups/${groupId}/doctypes`)
      .then(resp => setGroupDoctypes(resp.data))
      .catch(e => console.log(e));
  };

  const updateNonGroupDoctypes = () => {
    axios
      .get(`http://localhost:8081/Gentoo/api/groups/${groupId}/notdoctypes`)
      .then(resp => setNonGroupDoctypes(resp.data))
      .catch(e => console.log(e));
  };

  useEffect(
    function() {
      function getGroupInfo() {
        axios
          .get(`http://localhost:8081/Gentoo/api/groups/${groupId}`)
          .then(resp => setSelectedGroup(resp.data))
          .catch(e => console.log(e));
      }
      getGroupInfo();
      function getGroupDoctypes() {
        axios
          .get(`http://localhost:8081/Gentoo/api/groups/${groupId}/doctypes`)
          .then(resp => setGroupDoctypes(resp.data))
          .catch(e => console.log(e));
      }
      getGroupDoctypes();
    },
    [groupId]
  );

  useEffect(
    function() {
      function getNonGroupDoctypes() {
        axios
          .get(`http://localhost:8081/Gentoo/api/groups/${groupId}/notdoctypes`)
          .then(resp => setNonGroupDoctypes(resp.data))
          .catch(e => console.log(e));
      }
      getNonGroupDoctypes();
    },
    [groupId]
  );

  if (currentUsername === "loading" || setSelectedGroup === "Loading")
    return <div>Loading...</div>;

  const groupDoctypesList = groupDoctypes.map((doctype, index) => {
    function removeGroupDoctype() {
      axios
        .delete(
          `http://localhost:8081/Gentoo/api/groups/${groupId}/doctypes/${doctype.id}`
        )
        .then(updateGroupDoctypes)
        .then(updateNonGroupDoctypes);
    }
    return (
      <div className="row my-1" key={doctype.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{doctype.title}</div>
        <button className="col-3 btn btn-dark" onClick={removeGroupDoctype}>
          Pašalinti dokumento tipą iš grupės
        </button>
      </div>
    );
  });

  const nonGroupDoctypesList = nonGroupDoctypes.map((doctype, index) => {
    function addGroupDoctype() {
      axios
        .post(
          `http://localhost:8081/Gentoo/api/groups/${groupId}/doctypes/${doctype.id}`
        )

        .then(updateGroupDoctypes)
        .then(updateNonGroupDoctypes);
    }
    return (
      <div className="row my-1" key={doctype.id}>
        <div className="col-3">{index + 1}</div>
        <div className="col-6">{doctype.title}</div>
        <button className="col-3 btn btn-dark" onClick={addGroupDoctype}>
          Pridėti dokumento tipą į grupę
        </button>
      </div>
    );
  });

  return (
    <div>
      <NavigationForAdmin />
      <div className="container">
        <h4>Grupė {selectedGroup.title} valdo šiuos dokumentų tipus:</h4>
        <div className="row my-2">
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">Dokumento tipas</div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{groupDoctypesList}</div>
        <hr></hr>
        <h4>Kiti dokumentų tipai:</h4>
        <div className="row my-2">
          <div className="col-3 font-weight-bold">#</div>
          <div className="col-6 font-weight-bold">Dokumento tipas</div>
          <div className="col-3 font-weight-bold"></div>
        </div>
        <div>{nonGroupDoctypesList}</div>
      </div>
    </div>
  );
};

export default GroupDocsManager;
