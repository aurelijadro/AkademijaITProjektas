import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationForUser from "../NavigationForUser";
import ApiUrl from "../../APIURL";
import Axios from "axios";

const ModeratorDashboard = () => {
  // solve a riddle of how to correctly show users menu bar

  const [documentsToModerate, setDocumentsToModerate] = useState("loading");
  const [userId, setUserId] = useState("loading");
  const [isModerator, setIsModerator] = useState("loading");

  useEffect(function getUserId() {
    Axios.get(`${ApiUrl}loggedUserId`).then(resp => setUserId(resp.data));
  }, []);

  useEffect(
    function getDocumentsToModerate() {
      Axios.get(
        `${ApiUrl}documents/${userId}/documentstomoderate
      `
      ).then(resp => setDocumentsToModerate(resp.data));
    },
    [userId]
  );

  useEffect(
    function getIsModerator() {
      Axios.get(`${ApiUrl}users/${userId}/ismoderator`).then(resp =>
        setIsModerator(resp.data)
      );
    },
    [userId]
  );

  if (
    documentsToModerate === "loading" ||
    userId === "loading" ||
    isModerator === "loading"
  ) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  const documentsList = documentsToModerate.map((document, index) => {
    return (
      <li className="list-group-item list-group-item-dark" key={document.id}>
        <div className="row my-1">
          <div className="col-1">{index + 1}</div>
          <div className="col-3">{document.title}</div>
          <div className="col-2">{document.submissionDate}</div>
          <div className="col-3">{document.doctypes.title}</div>
          <Link className="col-2" to={`Gentoo/user/moderate/${document.id}`}>
            <button className="btn btn-dark">Peržiūrėti</button>
          </Link>
        </div>
      </li>
    );
  });

  // const doctypeGroupsList = doctypeGroups.map((group, index) => {
  //   function removeDoctypeGroup() {
  //     groupChange(() =>
  //       axios.delete(
  //         `${ApiUrl}groups/${group.id}/doctypesToCreate/${doctypeId}`
  //       )
  //     );
  //   }
  //   return (
  //     <li className="list-group-item list-group-item-dark" key={group.id}>
  //       <div className="row my-1">
  //         <div className="col-3">{index + 1}</div>
  //         <div className="col-6">{group.title}</div>
  //         <button className="col-3 btn btn-dark" onClick={removeDoctypeGroup}>
  //           Pašalinti grupę
  //         </button>
  //       </div>
  //     </li>
  //   );
  // });

  return (
    <div>
      <NavigationForUser isModerator={isModerator} />
      <div className="container my-4">
        <h4>Dokumentai, laukiantys patvirtinimo:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-1 font-weight-bold">#</div>
            <div className="col-3 font-weight-bold">Pavadinimas</div>
            <div className="col-2 font-weight-bold">Pateikimo data</div>
            <div className="col-3 font-weight-bold">Tipas</div>
            <div className="col-2 font-weight-bold"></div>
          </div>
        </li>
        <div>{documentsList}</div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
