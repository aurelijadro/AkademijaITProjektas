import React, { useEffect, useState } from "react";
import ApiUrl from "../APIURL";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import NavigationForUSer from "../components/NavigationForUser";

const ReviewDocument = withRouter(({ history, ...props }) => {
  const docId = props.match.params.docId;
  const [submittedDocument, setsubmittedDocument] = useState("loading");
  const [files, setFiles] = useState("loading");
  const [author, setAuthor] = useState("loading");
  const [moderator, setModerator] = useState(null);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(
    function getsubmittedDocument() {
      Axios.get(
        `${ApiUrl}documents/${docId}
      `
      ).then(resp => {
        setsubmittedDocument(resp.data);
        if (submittedDocument.documentStatus !== "Pateiktas") {
          getModerator();
        }
      });
    },
    [docId, submittedDocument.documentStatus, getModerator]
  );

  useEffect(
    function getAuhor() {
      Axios.get(`${ApiUrl}users/${submittedDocument.creatorId}`).then(resp =>
        setAuthor(resp.data)
      );
    },
    [submittedDocument.creatorId]
  );

  useEffect(
    function getIsModerator() {
      Axios.get(`${ApiUrl}users/${author.id}/ismoderator`).then(resp =>
        setIsModerator(resp.data)
      );
    },
    [author.id]
  );

  useEffect(
    function getFileList() {
      Axios.get(
        `${ApiUrl}files/${submittedDocument.creatorId}/${submittedDocument.id}/uploadedFilesData`
      ).then(resp => setFiles(resp.data));
    },
    [submittedDocument]
  );

  function getModerator() {
    Axios.get(`${ApiUrl}users/${submittedDocument.approverId}`).then(resp =>
      setModerator(resp.data)
    );
  }

  function downloadAllDocumentFiles() {
    fetch(`${ApiUrl}files/${author.id}/${docId}/downloadZip`).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "Bylos.zip";
        a.click();
      });
    });
  }

  if (
    submittedDocument === "loading" ||
    author === "loading" ||
    files === "loading"
  ) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  const heading =
    submittedDocument.documentStatus === "Pateiktas" ? (
      <h5 className="text-center my-2">Dokumentas laukia patvirtinimo.</h5>
    ) : submittedDocument.documentStatus === "Patvirtintas" ? (
      <h5 className="text-center my-2 text-success">
        Dokumentas yra patvirtintas.
      </h5>
    ) : (
      <h5 className="text-center my-2 text-danger">Dokumentas yra atmestas.</h5>
    );

  const summary =
    submittedDocument.summary === ""
      ? "Autorius nepateikė aprašymo."
      : submittedDocument.summary;

  const fileList = files.map((file, index) => {
    function download() {
      fetch(`${ApiUrl}files/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileName: file.fileName,
          documentId: docId,
          userId: author.id
        })
      }).then(resp => {
        resp.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = file.fileName;
          a.click();
        });
      });
    }

    return (
      <li className="list-group-item list-group-item-dark" key={index}>
        <div className="row my-1">
          <div className="col-1">{index + 1}</div>
          <div className="col-7">{file.fileName}</div>
          <div className="col-4 text-right">
            <button className="btn btn-dark" onClick={download}>
              Atsisiųsti bylą
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <NavigationForUSer isModerator={isModerator} />
      <div className="container my-4">
        <h4> Dokumento peržiūra</h4>
        <div>{heading}</div>
        {document.documentStatus === "Pateiktas" ? null : (
          <div className="row">
            <div className="col-4 font-weight-bold">Dokumentą priėmė:</div>
            <div className="col-4 font-weight-bold">Priėmimo data:</div>
          </div>
        )}
        <div className="row">
          <div className="col-4 font-weight-bold">Autorius:</div>
          <div className="col-4 font-weight-bold">Dokumento tipas:</div>
          <div className="col-4 font-weight-bold">Pateikimo data:</div>
        </div>
        <div className="row my-2">
          <div className="col-4">
            {author.name} {author.surname}
          </div>
          <div className="col-4">{submittedDocument.doctypes.title}</div>
          <div className="col-4">{submittedDocument.submissionDate}</div>
        </div>
        <div className="row my-2">
          <div className="col-12 font-weight-bold">Aprašymas: </div>
        </div>
        <div className="row my-2">
          <div className="col-12">{summary}</div>
        </div>
        <div className="row my-2">
          <div className="col-12 font-weight-bold">Pridėtos bylos: </div>
        </div>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-1 font-weight-bold">#</div>
            <div className="col-7 font-weight-bold">Bylos pavadinimas</div>
            <div className="col-4 font-weight-bold text-right">
              <button
                className="btn btn-dark"
                onClick={downloadAllDocumentFiles}
              >
                Atsisiųsti prikabintas bylas
              </button>
            </div>
          </div>
        </li>
        <div>{fileList}</div>
        <div></div>
      </div>
    </div>
  );
});

export default ReviewDocument;
