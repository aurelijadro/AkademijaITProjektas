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

  if (
    userId === -2 ||
    createdDocuments === "loading" ||
    submittedDocuments === "loading"
  )
    return <div>Loading...</div>;

  if (userId === -1) {
    return <Redirect to="/Gentoo" />;
  }

  const createdDocumentsList = createdDocuments.map((document, index) => {
    function submitDocument() {
      axios
        .get(`${ApiUrl}files/${userId}/${document.id}/uploadedFilesNames`)
        .then(response => {
          if (response.data.length > 0) {
            manageChanges(() =>
              axios.post(
                `${ApiUrl}documents/${userId}/${document.id}/submittedStatusUpdate`
              )
            );
          } else {
            alert(
              "Norit pateikti dokumentą būtina prikabinti bent vieną pdf bylą"
            );
          }
        })
        .catch(error =>
          alert(
            "Norit pateikti dokumentą būtina prikabinti bent vieną pdf bylą"
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
          <Link
            className="col-2 mx-3"
            to={`/Gentoo/user/documents/${document.id}`}
          >
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

  const submittedDocumentsList = submittedDocuments.map((document, index) => {
    return (
      <li
        className={`list-group-item ${
          document.documentStatus === "Atmestas" ? "list-group-item-danger" : ""
        }
       ${document.documentStatus === "Pateiktas" ? "list-group-item-dark" : ""} 
       ${
         document.documentStatus === "Patvirtintas"
           ? "list-group-item-success"
           : ""
       }`}
        key={document.id}
      >
        <div className="row my-1">
          <div className="col-3">{document.title}</div>
          <div className="col-2">{document.doctypes.title}</div>
          <div className="col-2">{document.documentStatus}</div>
          <div className="col-2">{document.submissionDate}</div>
          <Link
            className="col-2 mx-3"
            to={`/Gentoo/user/review/${document.id}`}
          >
            <button type="button" className="btn btn-dark ">
              Peržiūrėti
            </button>
          </Link>
        </div>
      </li>
    );
  });

  return (
    <div className="container">
      {saving ? (
        <span style={{ color: "white", position: "absolute", zIndex: 999 }}>
          Saving changes...
        </span>
      ) : null}

      <h2 className="my-4">Sukurti dokumentai:</h2>
      <li className="list-group-item list-group-item-dark">
        <div className="row my-2">
          <div className="col-3 font-weight-bold">Pavadinimas</div>
          <div className="col-2 font-weight-bold">Tipas</div>
          <div className="col-7 text-center font-weight-bold">
            Veiksmai su dokumentu
          </div>
        </div>
      </li>
      <div>{createdDocumentsList}</div>

      <h2 className="my-4">Pateikti dokumentai:</h2>
      <li className="list-group-item list-group-item-dark">
        <div className="row my-2">
          <div className="col-3 font-weight-bold">Pavadinimas</div>
          <div className="col-2 font-weight-bold">Tipas</div>
          <div className="col-2 font-weight-bold">Statusas</div>
          <div className="col-2 font-weight-bold">Pateikimo data</div>
          <div className="col-3 font-weight-bold">Veiksmai su dokumentu</div>
        </div>
      </li>
      <div>{submittedDocumentsList}</div>
    </div>
  );
};

export default CreatedDocuments;
