import React, { useState, useEffect } from "react";
import Axios from "axios";
import ApiUrl from "../../APIURL";
import { Link } from "react-router-dom";
import NavigationForUser from "./../NavigationForUser";

const ArchyvedDocuments = () => {
  const [archyvedDocuments, setArchyvedDocuments] = useState("loading");
  const [userId, setUserId] = useState("loading");
  const [isModerator, setIsModerator] = useState("loading");

  useEffect(function() {
    Axios.get(`${ApiUrl}loggedUserId`).then(resp => {
      setUserId(resp.data);
      Axios.get(
        `${ApiUrl}documents/${resp.data}/archyveddocuments
      `
      ).then(response => setArchyvedDocuments(response.data));
      Axios.get(`${ApiUrl}users/${resp.data}/ismoderator`).then(response2 =>
        setIsModerator(response2.data)
      );
    });
  }, []);

  if (
    archyvedDocuments === "loading" ||
    userId === "loading" ||
    isModerator === "loading"
  ) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }
  const documentsList = archyvedDocuments.map((document, index) => {
    return (
      <li
        className={`list-group-item ${
          document.documentStatus === "Atmestas"
            ? "list-group-item-danger"
            : "list-group-item-success"
        } `}
        key={document.id}
      >
        <div className="row my-1">
          <div className="col-3">{document.title}</div>
          <div className="col-2">{document.doctypes.title}</div>
          <div className="col-2">{document.submissionDate}</div>
          <div className="col-2">{document.documentStatus}</div>
          <Link className="col-2" to={`/Gentoo/user/archyved/${document.id}`}>
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
        <h4>Dokumentų archyvas:</h4>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-3 font-weight-bold">Pavadinimas</div>
            <div className="col-2 font-weight-bold">Tipas</div>
            <div className="col-2 font-weight-bold">Pateikimo data</div>
            <div className="col-2 font-weight-bold">Statusas</div>
            <div className="col-2 font-weight-bold"></div>
          </div>
        </li>
        <div>{documentsList}</div>
      </div>
    </div>
  );
};

export default ArchyvedDocuments;
