import React, { Component } from 'react';
import axios from "axios";
import AddMainDocumentForm from './AddMainDocumentForm';
import ApiUrl from "../../APIURL";
import DoctypeSelect from './DoctypeSelect';
import FileListComponent from './FileListComponent';

class NewDocumentContainer extends Component {
    constructor() {
        super();
        this.state = {
            doctypes: [{
                id: "",
                title: ""
            }
            ],
            userId: "",
            title: "",
            summary: "",
            id: "",
            results: []
        }
    }

    componentDidMount() {
        axios
            .get(`${ApiUrl}loggedUserId`)
            .then(response => {
                console.log(response)
                this.setState({ userId: response.data });
                axios
                    .get(`${ApiUrl}users/${this.state.userId}/doctypesusercreates`)
                    .then(response => {
                        this.setState({ doctypes: response.data })
                    })
                    .then()
                    .catch(error => {

                    });
            })
            .catch(error => {
                alert("Tokio vartotojo nera arba jis neprisijunges.")
            });

    }


    handleDoctypesChange = e => {
        this.setState({ doctypeItem: e.target.value });
        console.log("Astos", e.target.value)
    };

    addNewDocument = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            summary: this.state.summary,
            doctypeItem: this.state.doctypeItem
        }
        axios
            .post(`${ApiUrl}documents/${this.state.userId}/${this.state.doctypeItem}`, data)
            .then(response => {
                this.state.id = response.data.id;
                return this.state.id;
            })
            .then(response => {
                this.setState({ showResults: true });
                alert('Prašau prisegti papildomas bylas.')
            })
            .catch(error => {
            });
    }

    show = (e) => {
        return { showResults: false };
    }

    onFilesChange = event => {
        this.setState({ file: event.target.files[0] });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", this.state.file)
        axios
            .post(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadFile`, data)
            .then((response) => {
                axios.get(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`)
                    .then(response => {
                        this.setState({ results: response.data });
                        console.log(this.state.results)
                    })
                    .catch(error => {
                        alert("Kuriant dokumentą būtina pridėti bent vieną bylą.")
                    });
            })
            .catch((error) => {
                alert("You haven't uploaded any files, please try again.")
            })
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.delete(`${ApiUrl}files/${this.state.userId}/${this.state.id}/documentsDelete`)
            .then(response => {
                axios.get(`${ApiUrl}files/${this.state.userId}/${this.state.id}/uploadedFilesNames`)
                    .then(response => {
                        this.setState({ results: response.data });
                        alert("You have deleted all files successfully. \nYou can upload new files.")
                    })
                    .catch(error => {
                    });
            })
            .catch(error => { });
    }

    downloadFiles = (e) => {
        fetch(`${ApiUrl}files/${this.state.userId}/${this.state.id}/downloadZip`)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'Results.zip';
                    a.click();
                });
            });
    }

    saveDocument = (e) => {
        e.preventDefault();
        if (this.state.results && this.state.results.length > 0) {
            this.props.history.push(`/Gentoo/user`);
        } else {
            alert("Prašau pridėti bent vieną bylą.")
        }
    }

    render() {
        const doctypeItem = this.state.doctypes.map((doctype) =>
            <option
                key={doctype.id}
                value={doctype.id}>
                {doctype.title}
            </option>
        );
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
                        <form onSubmit={this.addNewDocument} >
                            <div className="form-group" >
                                <label > Pavadinimas: </label>
                                <input type="text" className="form-control" name="title" onChange={this.onChange} placeholder="Pavadinimas" required />

                            </div>
                            <div className="form-group" >
                                <label > Trumpas aprašymas </label>
                                <textarea className="form-control" name="summary" rows="3" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Pasirinkite dokumento tipą:
                                <select onChange={this.handleDoctypesChange}>
                                        <option value="Default">Pasirinkite dokumento tipą</option>
                                        {doctypeItem}
                                    </select>
                                </label>
                                <button className="btn-dark" id="document" type="submit">Patvirtinti</button>
                            </div >

                        </form>

                    </div>


                    <div className="panel-body">
                        {/* {this.state.showResults ? */}
                        <div>

                            <form onSubmit={this.onFormSubmit} >
                                <div className="form-group" >
                                    <label > Jūsų prisegtos bylos: </label>
                                    <button className="btn-dark" id="document" type="submit">Ištrinti bylas</button>
                                    {result}

                                    <div className="row" > </div>
                                    <input type="file" onChange={this.onFilesChange} />
                                    <div >
                                        <button id="uploadButton" type="submit" > Įkelti </button>
                                    </div >
                                </div>
                            </form >

                            {/* <div className="col-3">
                                <button onClick={this.handleClick}>Delete present files</button>
                            </div> */}

                            <div>
                                <h4 className="download">If you'd like to download files with the results, please press the download button below:</h4>
                                <button className="download" onClick={this.downloadFiles}>Download</button>
                            </div>

                            <button className="btn btn-dark" type="submit" onClick={this.saveDocument}> Išsaugoti </button>

                        </div>
                        {/* : null} */}







                    </div>
                </div >
            </div >
        );
    }

}

export default NewDocumentContainer;



