import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../../APIURL";
import NavigationForUSer from "../NavigationForUser";
import swal from "@sweetalert/with-react";

class NewDocumentContainer extends Component {
  constructor() {
    super();
    this.state = {
      doctypes: [
        {
          id: "",
          title: ""
        }
      ],
      userId: "",
      title: "",
      summary: "",
      id: "",
      files: [],
      file: null,
      isModerator: false,
      summaryError: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${ApiUrl}loggedUserId`)
      .then(response => {
        this.setState({ userId: response.data });
        axios
          .get(`${ApiUrl}users/${this.state.userId}/doctypesusercreates`)
          .then(response => {
            this.setState({ doctypes: response.data });
          })
          .then(
            axios
              .get(`${ApiUrl}users/${this.state.userId}/ismoderator`)
              .then(resp => this.setState({ isModerator: resp.data }))
          )
          .catch(error => { });
      })
      .catch(error => {
        swal({
          text: "Tokio vartotojo nėra arba jis neprisijungęs.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
      });
  }

  handleDoctypesChange = e => {
    this.setState({ doctypeItem: e.target.value });
  };

  handleSummaryChange = e => {
    this.setState({ summary: e.target.value }, () => {
      this.validateSummary();
    });
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  validateSummary = () => {
    const { summary } = this.state;
    this.setState({
      summaryError:
        summary.length <= 254
          ? null
          : "Aprašymas negali būti ilgesnis nei 254 simboliai."
    });
  };

  addNewDocument = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      summary: this.state.summary,
      doctypeItem: this.state.doctypeItem
    };
    if (
      this.state.doctypeItem !== undefined &&
      this.state.doctypeItem !== "Default"
    ) {
      axios
        .post(
          `${ApiUrl}documents/${this.state.userId}/${this.state.doctypeItem}`,
          data
        )
        .then(response => {
          this.setState({ id: response.data.id });
          return this.state.id;
        })
        .then(response => {
          this.setState({ showResults: true });
          swal({
            text: "Prisekite papildomas bylas.",
            button: {
              text: "OK",
              value: true,
              visible: true,
              className: "btn btn-dark",
              closeModal: true
            }
          });
        })
        .catch(error => { });
    } else {
      swal({
        text: "Pasirinkite dokumento tipą.",
        button: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-dark",
          closeModal: true
        }
      });
    }
  };

  show = e => {
    return { showResults: false };
  };

  onFilesChange = event => {
    event.preventDefault();
    this.setState({ file: event.target.files[0] });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.file !== null) {
      if (this.state.file.type.match("application/pdf")) {
        if (this.state.file.size < 10000000) {
          const data = new FormData();
          data.append("file", this.state.file);
          axios
            .post(
              `${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadFile`,
              data
            )
            .then(response => {
              axios
                .get(
                  `${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesData`
                )
                .then(resp => {
                  this.setState({ files: resp.data });
                })
                .catch(error => { });
            })
            .catch(error => {
              swal({
                text: "Pasirinkite bylą, kurią norite pridėti.",
                button: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "btn btn-dark",
                  closeModal: true
                }
              });
            });
        } else {
          swal({
            text:
              "Pasirinkta byla per didelė. \nByla negali būti didesnė nei 10Mb.",
            button: {
              text: "OK",
              value: true,
              visible: true,
              className: "btn btn-dark",
              closeModal: true
            }
          });
        }
      } else {
        swal({
          text: "Galite prisegti tik PDF tipo bylas.",
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-dark",
            closeModal: true
          }
        });
      }
    } else {
      swal({
        text: "Prisekite nors vieną bylą.",
        button: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-dark",
          closeModal: true
        }
      });
    }
  };

  handleClick = e => {
    e.preventDefault();
    axios
      .delete(
        `${ApiUrl}files/${this.state.userId}/${this.state.id}/documentsDelete`
      )
      .then(response => {
        axios
          .get(
            `${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesData`
          )
          .then(resp => {
            this.setState({ files: resp.data });
            swal({
              text: "Sėkmingai ištrynėte visas bylas. \nGalite įkelti naujas.",
              button: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-dark",
                closeModal: true
              }
            });
          })
          .catch(error => { });
      })
      .catch(error => { });
  };

  downloadFiles = e => {
    fetch(
      `${ApiUrl}files/${this.state.userId}/${this.state.id}/downloadZip`
    ).then(response => {
      if (this.state.files && this.state.files.length > 0) {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "Bylos.zip";
          a.click();
        });
      } else {
      }
    });
  };

  saveDocument = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      summary: this.state.summary,
      doctypeItem: this.state.doctypeItem
    };
    if (this.state.files && this.state.files.length > 0) {
      axios
        .put(
          `${ApiUrl}documents/${this.state.id}/${this.state.doctypeItem}`,
          data
        )
        .then(response => {
          this.props.history.push(`/Gentoo/user`);
        })
        .catch(error => { });
    } else {
      swal({
        text: "Pridėkite bent vieną bylą.",
        button: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-dark",
          closeModal: true
        }
      });
    }
  };

  render() {
    const { summary } = this.state;
    const doctypeItem = this.state.doctypes.map(doctype => (
      <option key={doctype.id} value={doctype.id}>
        {doctype.title}
      </option>
    ));
    const result = this.state.files.map((result, index) => {
      return (
        <li className="list-group-item list-group-item-dark" key={index}>
          <div className="row my-1">
            <div className="col-1">{index + 1}</div>
            <div className="col-7" onChange={this.onFilesChoice}>
              {result.fileName}
            </div>
          </div>
        </li>
      );
    });
    return (
      <div>
        <NavigationForUSer isModerator={this.state.isModerator} />
        <div className="container my-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title"> Naujo dokumento kūrimas </h4>
            </div>
            <div className="panel-body">
              <form onSubmit={this.addNewDocument}>
                <div className="form-group">
                  <label> Pavadinimas: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={this.onChange}
                    placeholder="Pavadinimas"
                    required
                  />
                </div>
                <div className="form-group">
                  <label> Trumpas aprašymas </label>
                  <textarea
                    className={`form-control ${
                      this.state.summaryError ? "is-invalid" : ""
                      }`}
                    name="summary"
                    value={summary}
                    onChange={this.handleSummaryChange}
                    onBlur={this.validateSummary}
                    rows="3"
                  ></textarea>
                  <div className="invalid-feedback">
                    {this.state.summaryError}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Pasirinkite dokumento tipą:
                    <select onChange={this.handleDoctypesChange}>
                      <option value="Default">
                        Dokumento tipas
                      </option>
                      {doctypeItem}
                    </select>
                  </label>
                  <button className="btn btn-dark" id="document" type="submit">
                    Patvirtinti
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-body">
              {this.state.showResults ? (
                <div>
                  <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                      <label> Jūsų prisegtos bylos: </label>
                      <li className="list-group-item list-group-item-dark">
                        <div className="row my-2">
                          <div className="col-1 font-weight-bold">#</div>
                          <div className="col-7 font-weight-bold">
                            Failo pavadinimas
                          </div>
                          <div className="col-2 font-weight-bold text-right">
                            <button
                              className="btn btn-dark"
                              onClick={this.downloadFiles}
                            >
                              Atsisiųsti bylas
                            </button>
                          </div>
                          <div className="col-2 font-weight-bold text-right">
                            <button
                              className="btn btn-dark"
                              id="document"
                              onClick={e => {
                                if (
                                  this.state.files &&
                                  this.state.files.length <= 0
                                ) {
                                } else {
                                  if (
                                    window.confirm(
                                      "Ar tikrai norite ištrinti įkeltas bylas?"
                                    )
                                  )
                                    this.handleClick(e);
                                }
                              }}
                            >
                              Ištrinti bylas
                            </button>
                          </div>
                        </div>
                      </li>
                      <div>{result}</div>
                      <div className="row"> </div>
                      <input
                        id="chooseFile"
                        type="file"
                        onChange={this.onFilesChange}
                      />
                      <div>
                        <button id="uploadButton" type="submit">
                          Įkelti
                        </button>
                      </div>
                    </div>
                  </form>
                  <button
                    className="btn btn-dark"
                    type="submit"
                    onClick={this.saveDocument}
                  >
                    Išsaugoti
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewDocumentContainer;
