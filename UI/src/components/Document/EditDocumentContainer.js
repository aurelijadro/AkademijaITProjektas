import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../../APIURL";
import NavigationForUSer from "../NavigationForUser";

class EditDocumentContainer extends Component {
  constructor() {
    super();
    this.state = {
      doctypes: [{}],
      userId: "",
      document: {
        id: "",
        title: "",
        summary: ""
      },
      files: [],
      file: null,
      loading: true,
      isModerator: false,
    };
  }

  componentDidMount() {
    this.getDocument();
  }

  getDocument = e => {
    axios
      .get(`${ApiUrl}documents/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          title: response.data.title,
          summary: response.data.summary,
          doctypeItemTitle: response.data.doctypes.title,
          doctypeItemId: response.data.doctypes.id
        });
        axios
          .get(`${ApiUrl}loggedUserId`)
          .then(response => {
            this.setState({ userId: response.data });
            axios
              .get(`${ApiUrl}users/${this.state.userId}/ismoderator`)
              .then(resp => this.setState({ isModerator: resp.data }));
            axios
              .get(`${ApiUrl}users/${this.state.userId}/doctypesusercreates`)
              .then(response => {
                this.setState({ doctypes: response.data });
              });
            axios
              .get(`${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadedFilesData`)
              .then(resp => {
                console.log(resp.data)
                this.setState({ files: resp.data });
              })
              .then(this.setState({ loading: false }))
              .catch(error => {
                alert("Dokumentas turi turėti bent vieną bylą.");
              });
          })
          .catch(error => {
            alert("Tokio vartotojo nėra arba jis neprisijungęs.");
          });
      })
      .catch(error => {
        alert("Duomenų apie šį dokumentą nėra.");
      });
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onSummaryChange = event => {
    this.setState({ summary: event.target.value });
  };

  handleDoctypesChange = e => {
    this.setState({ doctypeItemId: e.target.value });
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
              `${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadFile`,
              data
            )
            .then(response => {
              axios
                .get(`${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadedFilesData`)
                .then(resp => {
                  this.setState({ files: resp.data });
                })
                .catch(error => {
                  alert("Dokumentas turi turėti bent vieną bylą.");
                });
            })
            .catch(error => {
              alert("Įkelkite bent vieną bylą.");
            });
        } else {
          alert("Pasirinkta byla per didelė. \nByla negali būti didesnė nei 10Mb.");
        }
      } else {
        alert("Galite prisegti tik PDF tipo bylas.");
      }
    } else {
      // alert("Prisekite nors vieną bylą.")
    }
  };

  handleClick = e => {
    e.preventDefault();
    axios
      .delete(
        `${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/documentsDelete`
      )
      .then(response => {
        axios
          .get(`${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadedFilesData`)
          .then(resp => {
            this.setState({ files: resp.data });
            alert("Sėkmingai ištrynėte visas bylas. \nGalite įkelti naujas.");
          })
          .catch(error => { });
      })
      .catch(error => { });
  };

  downloadFiles = e => {
    fetch(
      `${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/downloadZip`)
      .then(response => {
        if (this.state.files !== null && this.state.files.length > 0) {
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

  updateDocument = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      summary: this.state.summary,
      doctypeItemId: this.state.doctypeItemId
    };
    axios
      .put(`${ApiUrl}documents/${this.props.match.params.id}/${this.state.doctypeItemId}`, data)
      .then(response => {
        if (this.state.files && this.state.files.length > 0) {
          alert("Jūs sėkmingai pakeitėte dokumento duomenis.");
          this.props.history.push("/Gentoo/user");
        } else {
          alert("Pridėkite bent vieną bylą.");
        }
      })
      .catch(error => { });
  };

  goBack = e => {
    e.preventDefault();
    if (this.state.files && this.state.files.length > 0) {
      this.props.history.push(`/Gentoo/user`);
    } else {
      alert("Pridėkite bent vieną bylą.");
    }
  };

  render() {
    if (this.state.loading) {
      return <div>Loading!!!!!!</div>;
    }
    const doctype = this.state.doctypes
      .filter(doctype => doctype.title !== this.state.doctypeItemTitle)
      .map((doctype, index) => {
        return (
          <option key={index} value={doctype.id}>
            {doctype.title}
          </option>
        );
      });
    const result = this.state.files.map((result, index) => {
      return (
        <li className="list-group-item list-group-item-dark" key={index}>
          <div className="row my-1">
            <div className="col-1">{index + 1}</div>
            <div className="col-7">{result.fileName}</div>
          </div>
        </li>
      )
    });
    return (
      <div>
        <NavigationForUSer isModerator={this.state.isModerator} />
        <div className="container my-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"> Dokumento peržiūra </h3>
            </div>
            <div className="panel-body">
              <form>
                <div className="form-group">
                  <label> Pavadinimas: </label>
                  <input type="text" className="form-control" name="title" onChange={this.onTitleChange} value={this.state.title} placeholder="Pavadinimas" required />
                </div>
                <div className="form-group">
                  <label> Trumpas aprašymas </label>
                  <textarea className="form-control" name="summary" onChange={this.onSummaryChange} value={this.state.summary} rows="3"></textarea>
                </div>
                <div className="form-group">
                  <label>
                    Pasirinkite dokumento tipą:
                    <select onChange={this.handleDoctypesChange}>
                      <option value={this.state.doctypeItemId}>
                        {this.state.doctypeItemTitle}
                      </option>
                      {doctype}
                    </select>
                  </label>
                </div>
              </form>
              <form onSubmit={this.onFormSubmit}>
                <button className="btn btn-dark" id="saveButton" type="submit" onClick={this.updateDocument}>
                  Išsaugoti
                </button>
                <button className="btn btn-dark" id="saveButton" type="submit" onClick={this.goBack}>
                  Atšaukti pakeitimus
                </button>
                <div className="form-group">
                  <label> Jūsų prisegtos bylos: </label>
                  <li className="list-group-item list-group-item-dark">
                    <div className="row my-2">
                      <div className="col-1 font-weight-bold">#</div>
                      <div className="col-7 font-weight-bold">Failo pavadinimas</div>
                      <div className="col-2 font-weight-bold text-right">
                        <button className="btn btn-dark" onClick={this.downloadFiles}>
                          Atsisiųsti bylas
                            </button>
                      </div>
                      <div className="col-2 font-weight-bold text-right">
                        <button className="btn btn-dark" id="document"
                          onClick={e => {
                            if (this.state.files && this.state.files.length <= 0) {

                            } else {
                              if (window.confirm("Ar tikrai norite ištrinti įkeltas bylas?"))
                                this.handleClick(e);
                            }
                          }}>
                          Ištrinti bylas
                            </button>
                      </div>
                    </div>
                  </li>
                  <div>{result}</div>
                  <div className="row"> </div>
                  <input id="chooseFile" type="file" onChange={this.onFilesChange} />
                  <div>
                    <button id="uploadButton" type="submit">
                      Įkelti
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDocumentContainer;
