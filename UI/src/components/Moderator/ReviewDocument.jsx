import React, { useEffect, useState } from "react";
import ApiUrl from "../../APIURL";
import Axios from "axios";

const ReviewDocument = props => {
  const docId = props.match.params.docId;
  const [document, setDocument] = useState("loading");
  const [author, setAuthor] = useState("loading");
  const [moderatorId, setModeratorId] = useState("loading");

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
  });

  function approveDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/approvedStatusUpdate`
    );
  }

  function denyDocument() {
    Axios.post(
      `${ApiUrl}documents/${moderatorId}/${docId}/rejectedStatusUpdate`
    );
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
    moderatorId === "loading"
  ) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  const summary =
    document.summary === "" ? "Autorius nepateikė aprašymo." : document.summary;

  console.log(summary);

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
      </div>
    </div>
  );
};

export default ReviewDocument;
