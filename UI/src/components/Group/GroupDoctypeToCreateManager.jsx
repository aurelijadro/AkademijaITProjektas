import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";
import ApiUrl from "../../APIURL";

const GroupDocsToCreateManager = props => {
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
    fetchFromServer(`groups/${groupId}/doctypesToCreate`).then(
      setGroupDoctypes
    );
    fetchFromServer(`groups/${groupId}/notdoctypesToCreate`).then(
      setNonGroupDoctypes
    );
  };

  useEffect(function() {
    updateCachedData();
    // const timer = setInterval(updateCachedData, 2000);
    // return () => clearInterval(timer);
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
        axios.delete(
          `${ApiUrl}groups/${groupId}/doctypesToCreate/${doctype.id}`
        )
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={doctype.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{doctype.title}</div>
          <button className="col-3 btn btn-dark" onClick={removeGroupDoctype}>
            Pašalinti iš grupės
          </button>
        </div>
      </li>
    );
  });

  const nonGroupDoctypesList = nonGroupDoctypes.map((doctype, index) => {
    function addGroupDoctype() {
      doctypeChange(() =>
        axios.post(`${ApiUrl}groups/${groupId}/doctypesToCreate/${doctype.id}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={doctype.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{doctype.title}</div>
          <button className="col-3 btn btn-dark" onClick={addGroupDoctype}>
            Pridėti į grupę
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
        <h4>Grupė {selectedGroup.title} gali kurti šių tipų dokumentus:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">Dokumento tipas</div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{groupDoctypesList}</div>
        <hr></hr>
        <h4>Kiti dokumentų tipai:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">Dokumento tipas</div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{nonGroupDoctypesList}</div>
      </div>
    </div>
  );
};

export default GroupDocsToCreateManager;
