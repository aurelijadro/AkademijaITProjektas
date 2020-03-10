import React, { useEffect, useState } from "react";
import ApiUrl from "../../APIURL";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import NavigationForUSer from "../NavigationForUser";

const ReviewDocument = withRouter(({ history, ...props }) => {
  const docId = props.match.params.docId;
  const [submittedDocument, setsubmittedDocument] = useState("loading");
  const [files, setFiles] = useState("loading");
  const [author, setAuthor] = useState("loading");
  const [moderatorId, setModeratorId] = useState("loading");
  const [denialReason, setDenialReason] = useState("");
  const [decide, setDecide] = useState("choose");
  const [denyError, setDenyError] = useState("Pateikite atmetimo priežastį");
  const [canDeny, setCanDeny] = useState(true);

  useEffect(
    function getsubmittedDocument() {
      Axios.get(
        `${ApiUrl}documents/${docId}
      `
      ).then(resp => setsubmittedDocument(resp.data));
    },
    [docId]
  );

  useEffect(
    function getAuhor() {
      Axios.get(`${ApiUrl}users/${submittedDocument.creatorId}`).then(resp =>
        setAuthor(resp.data)
      );
    },
    [submittedDocument.creatorId]
  );

  useEffect(function getModeratorId() {
    Axios.get(`${ApiUrl}loggedUserId`).then(resp => setModeratorId(resp.data));
  }, []);

  useEffect(
    function getFileList() {
      Axios.get(
        `${ApiUrl}files/${submittedDocument.creatorId}/${submittedDocument.id}/uploadedFilesData`
      ).then(resp => setFiles(resp.data));
    },
    [submittedDocument]
  );

  function approvesubmittedDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/approvedStatusUpdate`
    )
      .then(alert("Dokumentas sėkmingai patvirtintas"))
      .then(history.push("/Gentoo/user/moderate"));
  }

  function denysubmittedDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/rejectedStatusUpdate`,
      denialReason,
      { headers: { "Content-Type": "text/plain" } }
    )
      .then(alert("Dokumentas atmestas"))
      .then(history.push("/Gentoo/user/moderate"));
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

  function chooseDeny(e) {
    e.preventDefault();
    setCanDeny(false);
    setDecide("deny");
  }

  // insert navbar with moderator status

  // get submittedDocument data from server

  // show submittedDocument title, submitting, date, type, author, summary and attached pdf files

  // allow moderator download files attached

  // approve submittedDocument functionality
  // deny submittedDocument functioanlity

  if (
    submittedDocument === "loading" ||
    author === "loading" ||
    moderatorId === "loading" ||
    files === "loading"
  ) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  const handleChange = e => {
    setDenialReason(e.target.value);
    validateDenyReason();
  };

  function validateDenyReason() {
    if (denialReason.length >= 5) {
      setDenyError(null);
      setCanDeny(true);
    }
  }

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
              Atsisiųsti failą
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <NavigationForUSer isModerator={moderatorId !== "loading"} />
      <div className="container my-4">
        <h4> Dokumento peržiūra</h4>
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
          <div className="col-12 font-weight-bold">Pridėti dokumentai: </div>
        </div>
        <li className="list-group-item list-group-item-dark">
          <div className="row my-2">
            <div className="col-1 font-weight-bold">#</div>
            <div className="col-7 font-weight-bold">Failo pavadinimas</div>
            <div className="col-4 font-weight-bold text-right">
              <button
                className="btn btn-dark"
                onClick={downloadAllDocumentFiles}
              >
                Atsisiųsti prikabintus failus
              </button>
            </div>
          </div>
        </li>
        <div>{fileList}</div>
        {decide === "choose" ? (
          <div className="row my-4">
            <div className="col-2"> </div>
            <div className="col-4">
              <button
                className="btn btn-dark"
                onClick={approvesubmittedDocument}
              >
                Patvirtinti dokumentą
              </button>
            </div>
            <div className="col-4">
              <button className="btn btn-dark" onClick={chooseDeny}>
                Atmesti dokumentą
              </button>
            </div>
            <div className="col-2"> </div>
          </div>
        ) : null}
        <div>
          {decide === "deny" ? (
            <div className="my-4">
              <form onSubmit={denysubmittedDocument}>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Įveskite atmetimo priežastį:
                  </label>
                  <textarea
                    className={`form-control ${denyError ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    required
                    placeholder="Norint atmesti dokumentą būtina nurodyti atmetimo priežastį."
                    onBlur={validateDenyReason}
                  ></textarea>
                  <div className="invalid-feedback">{denyError}</div>

                  <div className="row my-4">
                    <div className="col-2"> </div>
                    <div className="col-4">
                      <button
                        className="btn btn-dark"
                        onClick={approvesubmittedDocument}
                      >
                        Patvirtinti dokumentą
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-dark"
                        disabled={!canDeny}
                        type="submit"
                      >
                        Atmesti dokumentą
                      </button>
                    </div>
                    <div className="col-2"> </div>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default ReviewDocument;
