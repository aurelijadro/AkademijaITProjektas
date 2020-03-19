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

  useEffect(function() {
    Axios.get(`${ApiUrl}loggedUserId`).then(resp => {
      setUserId(resp.data);
      Axios.get(
        `${ApiUrl}documents/${resp.data}/archyveddocuments
      `
      ).then(response => setDocumentsToModerate(response.data));
      Axios.get(`${ApiUrl}users/${resp.data}/ismoderator`).then(response2 =>
        setIsModerator(response2.data)
      );
    });
  }, []);

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
          <Link className="col-2" to={`/Gentoo/user/moderate/${document.id}`}>
            <button className="btn btn-dark">Peržiūrėti</button>
          </Link>
        </div>
      </li>
    );
  });

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
