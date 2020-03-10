import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../../APIURL";
import NavigationForUSer from "../NavigationForUser";

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
      results: [],
      file: null,
      isModerator: false
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
          .catch(error => {});
      })
      .catch(error => {
        alert("Tokio vartotojo nera arba jis neprisijunges.");
      });
  }

  handleDoctypesChange = e => {
    this.setState({ doctypeItem: e.target.value });
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  addNewDocument = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      summary: this.state.summary,
      doctypeItem: this.state.doctypeItem
    };
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
        alert("Prisekite papildomas bylas.");
      })
      .catch(error => {});
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
                `${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`
              )
              .then(response => {
                this.setState({ results: response.data });
              })
              .catch(error => {
                alert("Kuriant dokumentą būtina pridėti bent vieną bylą.");
              });
          })
          .catch(error => {
            alert("Pasirinkite bylą, kurią norite pridėti.");
          });
      } else {
        alert(
          "Pasirinkta byla per didelė. \nByla negali būti didesnė nei 10Mb."
        );
      }
    } else {
      alert("Galite prisegti tik PDF tipo bylas.");
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
            `${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`
          )
          .then(response => {
            this.setState({ results: response.data });
            alert("Sėkmingai ištrynėte visas bylas. \nGalite įkelti naujas.");
          })
          .catch(error => {});
      })
      .catch(error => {});
  };

  downloadFiles = e => {
    fetch(
      `${ApiUrl}files/${this.state.userId}/${this.state.id}/downloadZip`
    ).then(response => {
      if (this.state.results && this.state.results.length > 0) {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "Bylos.zip";
          a.click();
        });
      } else {
        alert("Jūs neprisegėte nei vienos bylos.");
      }
    });
  };

  saveDocument = e => {
    e.preventDefault();
    if (this.state.results && this.state.results.length > 0) {
      this.props.history.push(`/Gentoo/user`);
    } else {
      alert("Prašau pridėti bent vieną bylą.");
    }
  };

  render() {
    const doctypeItem = this.state.doctypes.map(doctype => (
      <option key={doctype.id} value={doctype.id}>
        {doctype.title}
      </option>
    ));
    const result = this.state.results.map((result, index) => {
      return (
        <li
          className="list-group-item list-group-item-dark"
          id="mylist2"
          key={index}
        >
          <div className="row my-1">
            <div className="col-2">{index + 1}</div>
            <div className="col-10">{result}</div>
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
              <h3 className="panel-title"> Naujo dokumento kūrimas </h3>
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
                    className="form-control"
                    name="summary"
                    onChange={this.onChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>
                    Pasirinkite dokumento tipą:
                    <select onChange={this.handleDoctypesChange}>
                      <option value="Default">
                        Pasirinkite dokumento tipą
                      </option>
                      {doctypeItem}
                    </select>
                  </label>
                  <button className="btn-dark" id="document" type="submit">
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
                      <button
                        className="btn-dark"
                        id="document"
                        onClick={e => {
                          if (
                            this.state.results &&
                            this.state.results.length <= 0
                          ) {
                            alert("Nepridėjote nei vienos bylos.");
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
                      <li
                        className="list-group-item list-group-item-dark"
                        id="mylist"
                      >
                        <div className="row my-2">
                          <div className="col-2 font-weight-bold">#</div>
                          <div className="col-10 font-weight-bold">
                            Bylos pavadinimas
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
                  <div className="panel-body">
                    <label>Parsisiųsti bylas peržiūrai:</label>
                    <div className="row"> </div>
                    <button className="download" onClick={this.downloadFiles}>
                      Atsisiųsti
                    </button>
                  </div>
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
