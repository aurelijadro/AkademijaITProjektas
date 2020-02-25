import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";
import { useMyData } from "../../context";
import ApiUrl from "../../APIURL";

const DoctypeGroupsManager = props => {
  const { currentUsername } = useMyData();
  const [doctypeGroups, setDoctypeGroups] = useState("loading");
  const [nonDoctypeGroups, setNonDoctypeGroups] = useState("loading");
  const [selectedDoctype, setSelectedDoctype] = useState("loading");
  const [saving, setSaving] = useState(false);

  const doctypeId = props.match.params.doctypeid;

  function fetchFromServer(path) {
    return axios.get(ApiUrl + path).then(resp => resp.data);
  }

  const updateCachedData = () => {
    fetchFromServer(`doctypes/${doctypeId}/groups`).then(setDoctypeGroups);
    fetchFromServer(`doctypes/${doctypeId}/notDoctypeGroups`).then(
      setNonDoctypeGroups
    );
  };

  useEffect(function() {
    updateCachedData();
    // const timer = setInterval(updateCachedData, 2000);
    // return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function getDoctypeInfo() {
      axios
        .get(`${ApiUrl}doctypes/${doctypeId}`)
        .then(resp => setSelectedDoctype(resp.data))
        .catch(e => console.log(e));
    },
    [doctypeId]
  );

  function groupChange(f) {
    setSaving(true);
    f()
      .then(updateCachedData)
      .then(() => setSaving(false));
  }

  if (
    currentUsername === "loading" ||
    selectedDoctype === "loading" ||
    doctypeGroups === "loading" ||
    nonDoctypeGroups === "loading"
  )
    return <div>Loading...</div>;

  const doctypeGroupsList = doctypeGroups.map((group, index) => {
    function removeDoctypeGroup() {
      groupChange(() =>
        axios.delete(`${ApiUrl}groups/${group.id}/doctypes/${doctypeId}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={group.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{group.title}</div>
          <button className="col-3 btn btn-dark" onClick={removeDoctypeGroup}>
            Pašalinti grupę
          </button>
        </div>
      </li>
    );
  });

  const nonDoctypeGroupsList = nonDoctypeGroups.map((group, index) => {
    function addDoctypeGroup() {
      groupChange(() =>
        axios.post(`${ApiUrl}groups/${group.id}/doctypes/${doctypeId}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={group.id}>
        <div className="row my-1">
          <div className="col-3">{index + 1}</div>
          <div className="col-6">{group.title}</div>
          <button className="col-3 btn btn-dark" onClick={addDoctypeGroup}>
            Pridėti grupę
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
        <h4>
          {" "}
          {selectedDoctype.title} tipo dokumentus gali kurti šios grupės:
        </h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">Grupės pavadinimas</div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{doctypeGroupsList}</div>
        <hr></hr>
        <h4>Kiti sistemoje esančios grupės:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">#</div>
            <div className="col-6 font-weight-bold">Grupės pavadinimas</div>
            <div className="col-3 font-weight-bold"></div>
          </div>
        </li>
        <div>{nonDoctypeGroupsList}</div>
      </div>
    </div>
  );
};

export default DoctypeGroupsManager;
