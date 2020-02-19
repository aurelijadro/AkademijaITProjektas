import React, { Component } from "react";
import axios from "axios";
import UploadFileComponent from "./UploadFileComponent";

class UploadFileContainer extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onFileChangeHandler = e => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("file", e.target.files[i]);
    }
    axios
      .post("http://localhost:8081/Gentoo/api/documents/upload", formData)
      .then(res => {
        alert("Įkėlimas sėkmingas.");
      });
  };

  render() {
    return (
      <div>
        <UploadFileComponent onFileChangeHandler={this.onFileChangeHandler} />
      </div>
    );
  }
}

export default UploadFileContainer;
