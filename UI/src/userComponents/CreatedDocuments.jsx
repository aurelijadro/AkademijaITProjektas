import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiUrl from "../APIURL.jsx";
import { Redirect, Link } from "react-router-dom";

const CreatedDocuments = props => {
  const userId = props.id;
  const [createdDocuments, setCreatedDocuments] = useState("loading");
  const [submittedDocuments, setSubmittedDocuments] = useState("loading");
  const [saving, setSaving] = useState(false);

  function fetchFromServer(path) {
    console.log(props);
    return axios.get(ApiUrl + path).then(resp => resp.data);
  }

  const updateCachedData = () => {
    fetchFromServer(`documents/${userId}/createdDocuments
    `).then(setCreatedDocuments);
    fetchFromServer(`documents/${userId}/submittedDocuments
    `).then(setSubmittedDocuments);
  };

  useEffect(function() {
    updateCachedData();
    // const timer = setInterval(updateCachedData, 2000);
    // return () => clearInterval(timer);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function manageChanges(f) {
    setSaving(true);
    f()
      .then(updateCachedData)
      .then(() => setSaving(false));
  }

  if (userId === -2 || createdDocuments === "loading")
    return <div>Loading...</div>;

  if (userId === -1) {
    return <Redirect to="/Gentoo" />;
  }

  const createdDocumentsList = createdDocuments.map((document, index) => {
    function submitDocument() {
      manageChanges(() =>
        axios.post(
          `${ApiUrl}documents/${userId}/${document.id}/submittedStatusUpdate`
        )
      );
    }
    function deleteDocumet() {
      manageChanges(() =>
        axios.delete(`${ApiUrl}documents/${userId}/${document.id}`)
      );
    }
    return (
      <li className="list-group-item list-group-item-dark" key={document.id}>
        <div className="row my-1">
          <div className="col-3">{document.title}</div>
          <div className="col-2">{document.doctypes.title}</div>
          <Link className="col-2 mx-3" to={`/Gentoo/user`}>
            <button type="button" className="btn btn-dark ">
              Peržiūrėti/Redaguoti
            </button>
          </Link>
          <button className="col-2 btn btn-dark mx-2" onClick={submitDocument}>
            Pateikti dokumentą
          </button>
          <button className="col-2 btn btn-dark mx-2 " onClick={deleteDocumet}>
            Ištrinti dokumentą
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="container my-4">
      <h2>Sukurti dokumentai:</h2>
      <div>{createdDocumentsList}</div>
    </div>
  );
};

export default CreatedDocuments;
