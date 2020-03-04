import React, { Component } from 'react';
import axios from "axios";
import ApiUrl from "../../APIURL";
import FileListComponent from './FileListComponent';

class EditDocumentContainer extends Component {
    constructor() {
        super();
        this.state = {
            doctypes: [{
                id: "",
                title: ""
            }],
            userId: "",
            title: "",
            summary: "",
            results: [],
            file: null,
        }
    }

    componentDidMount() {
        this.getDocument();
    }

    getDocument = (e) => {
        axios
            .get(`${ApiUrl}documents/${this.props.match.params.id}`)
            .then(response => {
                this.setState(response.data);
                axios
                    .get(`${ApiUrl}loggedUserId`)
                    .then(response => {
                        this.setState({ userId: response.data });
                        axios
                            .get(`${ApiUrl}users/${this.state.userId}/doctypesusercreates`)
                            .then(response => {
                                this.setState({ doctypes: response.data })
                            })
                            .then(response => {
                                this.setState({
                                    doctypeItem: this.state.doctypes.map((doctype) =>
                                        <option
                                            key={doctype.id}
                                            value={doctype.id}>
                                            {doctype.title}
                                        </option>
                                    )
                                })
                            });
                        axios.get(`${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadedFilesNames`)
                            .then(response => {
                                this.setState({ results: response.data });
                            })
                            .catch(error => {
                                alert("Dokumentas turi turėti bent vieną bylą.")
                            });
                    })
                    .catch(error => {
                        alert("Tokio vartotojo nera arba jis neprisijunges.")
                    });
            })
            .catch(error => {
                alert("Duomenų apie šį dokumentą nėra.")
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDoctypesChange = e => {
        this.setState({ value: e.target.value });
    };

    onFilesChange = event => {
        event.preventDefault();
        this.setState({ file: event.target.files[0] });
    };

    onFormSubmit = (e) => {
        const data = new FormData()
        data.append("file", this.state.file)
        axios
            .post(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadFile`, data)
            .then((response) => {
                axios.get(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`)
                    .then(response => {
                        this.setState({ results: response.data });
                    })
                    .catch(error => {
                        alert("Dokumentas turi turėti bent vieną bylą.")
                    });
            })
            .catch((error) => {
                alert("Įkelkite bent vieną bylą.")
            })
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.delete(`${ApiUrl}files/${this.state.userId}/${this.state.id}/documentsDelete`)
            .then(response => {
                axios.get(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`)
                    .then(response => {
                        this.setState({ results: response.data });
                        alert("Sėkmingai ištrynėte visas bylas. \nGalite įkelti naujas.")
                    })
                    .catch(error => {
                    });
            })
            .catch(error => { });
    }

    downloadFiles = (e) => {
        fetch(`${ApiUrl}files/${this.state.userId}/${this.state.id}/downloadZip`)
            .then(response => {
                if (this.state.results && this.state.results.length > 0) {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'Bylos.zip';
                        a.click();
                    });
                } else {
                    alert("Neprisegėte nei vienos bylos.");
                }
            });
    }

    updateDocument = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            summary: this.state.summary,
        }
        axios
            .put(`${ApiUrl}documents/${this.props.match.params.id}/${this.state.value}`, data)
            .then(response => {
                if (this.state.results && this.state.results.length > 0) {
                    alert("Jūs sėkmingai pakeitėte dokumento duomenis.");
                    this.props.history.push("/Gentoo/user");
                } else {
                    alert("Pridėkite bent vieną bylą.")
                }
            })
            .catch(error => { })
    }

    goBack = e => {
        e.preventDefault();
        this.props.history.push(`/Gentoo/user`);
    }

    render() {
        const result = this.state.results.map((result, index) => {
            return <FileListComponent key={index} result={result} />;
        });
        return (
            <div className="container my-4" >
                <div className="panel panel-default" >
                    <div className="panel-heading" >
                        <h3 className="panel-title" > Naujo dokumento kūrimas </h3>
                    </div>
                    <div className="panel-body" >
                        <form >
                            <div className="form-group" >
                                <label > Pavadinimas: </label>
                                <input type="text" className="form-control" name="title" onChange={this.onChange} value={this.state.title} placeholder="Pavadinimas" required />
                            </div>
                            <div className="form-group" >
                                <label > Trumpas aprašymas </label>
                                <textarea className="form-control" name="summary" onChange={this.onChange} value={this.state.summary} rows="3" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Pasirinkite dokumento tipą:
                            <select value={this.state.doctypes.title} onChange={this.handleDoctypesChange} >
                                        {this.state.doctypeItem}
                                    </select>
                                </label>
                            </div >
                        </form>
                        <form onSubmit={this.onFormSubmit} >
                            <div className="form-group" >
                                <label > Jūsų prisegtos bylos: </label>
                                <button className="btn-dark" id="document" onClick={this.handleClick}>Ištrinti bylas</button>
                                {result}
                                <div className="row" > </div>
                                <input type="file" onChange={this.onFilesChange} />
                                <div >
                                    <button id="uploadButton" type="submit" > Įkelti </button>
                                </div >
                            </div>
                        </form >
                        <div className="panel-body">
                            <label>Parsisiųsti bylas peržiūrai:</label>
                            <div className="row" > </div>
                            <button className="download" onClick={this.downloadFiles}>Atsisiųsti</button>
                        </div>
                        <button className="btn btn-dark" type="submit" onClick={this.updateDocument}> Išsaugoti </button>
                        <button className="btn btn-dark" type="submit" onClick={this.goBack}> Atšaukti pakeitimus </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDocumentContainer;