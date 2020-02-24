import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";
import ApiUrl from "../../APIURL";

const GroupDocsManager = props => {
  const { currentUsername } = useMyData();
  const [groupDoctypes, setGroupDoctypes] = useState("loading");
  const [nonGroupDoctypes, setNonGroupDoctypes] = useState("loading");
  const [selectedGroup, setSelectedGroup] = useState("loading");
  const [saving, setSaving] = useState(false);

  const groupId = props.match.params.groupid;

  function fetchFromServer(path) {
    return axios.get(ApiUrl + path).then(resp => resp.data);
  }

  const updateCachedData = () => {
    fetchFromServer(`groups/${groupId}/doctypes`).then(setGroupDoctypes);
    fetchFromServer(`groups/${groupId}/notdoctypes`).then(setNonGroupDoctypes);
  };

  useEffect(function() {
    updateCachedData();
    const timer = setInterval(updateCachedData, 2000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function getGroupInfo() {
      axios
        .get(`${ApiUrl}groups/${groupId}`)
        .then(resp => setSelectedGroup(resp.data))
        .catch(e => console.log(e));
    },
    [groupId]
  );

  function doctypeChange(f) {
    setSaving(true);
    f()
      .then(updateCachedData)
      .then(() => setSaving(false));
  }

  if (
    currentUsername === "loading" ||
    selectedGroup === "loading" ||
    groupDoctypes === "loading" ||
    nonGroupDoctypes === "loading"
  )
    return <div>Loading...</div>;

  const groupDoctypesList = groupDoctypes.map((doctype, index) => {
    function removeGroupDoctype() {
      doctypeChange(() =>
        axios.delete(`${ApiUrl}groups/${groupId}/doctypes/${doctype.id}`)
      );
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
      doctypeChange(() =>
        axios.post(`${ApiUrl}groups/${groupId}/doctypes/${doctype.id}`)
      );
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
      {saving ? (
        <span style={{ color: "white", position: "absolute", zIndex: 999 }}>
          Saving changes...
        </span>
      ) : null}
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
