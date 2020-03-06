import React, { useEffect, useState } from "react";
import ApiUrl from "../../APIURL";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const ReviewDocument = withRouter(({ history, ...props }) => {
  const docId = props.match.params.docId;
  const [document, setDocument] = useState("loading");
  const [files, setFiles] = useState("loading");
  const [author, setAuthor] = useState("loading");
  const [moderatorId, setModeratorId] = useState("loading");
  const [denialReason, setDenialReason] = useState("");
  const [decide, setDecide] = useState("choose"); //choose / approve / deny

  useEffect(
    function getDocument() {
      Axios.get(
        `${ApiUrl}documents/${docId}
      `
      ).then(resp => setDocument(resp.data));
    },
    [docId]
  );

  useEffect(
    function getAuhor() {
      Axios.get(`${ApiUrl}users/${document.creatorId}`).then(resp =>
        setAuthor(resp.data)
      );
    },
    [document.creatorId]
  );

  useEffect(function getModeratorId() {
    Axios.get(`${ApiUrl}loggedUserId`).then(resp => setModeratorId(resp.data));
  }, []);

  useEffect(
    function getFileList() {
      Axios.get(
        `${ApiUrl}files/${document.creatorId}/${document.id}/uploadedFilesData`
      ).then(resp => setFiles(resp.data));
    },
    [document]
  );

  function approveDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/approvedStatusUpdate`
    )
      .then(alert("Dokumentas sėkmingai patvirtintas"))
      .then(history.push("/Gentoo/user/moderate"));
  }

  function denyDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/rejectedStatusUpdate`,
      denialReason,
      { headers: { "Content-Type": "text/plain" } }
    )
      .then(alert("Dokumentas atmestas"))
      .then(history.push("/Gentoo/user/moderate"));
  }

  function chooseDeny(e) {
    e.preventDefault();
    setDecide("deny");
  }

  // insert navbar with moderator status

  // get document data from server

  // show document title, submitting, date, type, author, summary and attached pdf files

  // allow moderator download files attached

  // approve document functionality
  // deny document functioanlity

  if (
    document === "loading" ||
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
  };

  const summary =
    document.summary === "" ? "Autorius nepateikė aprašymo." : document.summary;

  const fileList = files.map((file, index) => {
    return (
      <li className="list-group-item list-group-item-dark" key={index}>
        <div className="row my-1">
          <div className="col-1">{index + 1}</div>
          <div className="col-7">{file.fileName}</div>
          <div className="col-4 text-right">
            <a className="btn btn-dark" href="someLink" target="_blank">
              Peržiūrėti dokumentą
            </a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
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
          <div className="col-4">{document.doctypes.title}</div>
          <div className="col-4">{document.submissionDate}</div>
        </div>
        <div className="row my-2">
          <div className="col-12 font-weight-bold">Aprašymas: </div>
        </div>
        <div className="row">
          <div className="col-12">{summary}</div>
        </div>
        <div>{fileList}</div>
        {decide === "choose" ? (
          <div className="row my-4">
            <div className="col-2"> </div>
            <div className="col-4">
              <button className="btn btn-dark" onClick={approveDocument}>
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
              <form onSubmit={denyDocument}>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Įveskite atmetimo priežastį:
                  </label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                  <button type="submit" className="btn btn-dark my-4">
                    Atmesti
                  </button>
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
