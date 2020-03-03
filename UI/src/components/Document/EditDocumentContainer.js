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



    getDocument = () => {
        axios
            .get(`${ApiUrl}documents/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data)
                this.setState(response.data);
                axios
                    .get(`${ApiUrl}loggedUserId`)
                    .then(response => {
                        console.log(response)
                        this.setState({ userId: response.data });
                        axios
                            .get(`${ApiUrl}users/${this.state.userId}/doctypesusercreates`)
                            .then(response => {
                                console.log(response.data);
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
                                console.log("Dokumentu sarasas", this.state.doctypeItem)
                            });
                        axios.get(`${ApiUrl}files/${this.state.userId}/${this.props.match.params.id}/uploadedFilesNames`)
                            .then(response => {
                                this.setState({ results: response.data });
                                console.log("sekme sekme")
                            })
                            .catch(error => {
                                alert("Kuriant dokumentą būtina pridėti bent vieną bylą.")
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
        this.setState({ doctypeItem: e.target.value });
        console.log("Astos", e.target.value)
    };

    onFilesChange = event => {
        this.setState({ file: event.target.files[0] });
    };

    updateDocument = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            summary: this.state.summary,
            doctypeItem: this.state.doctypeItem
        }
        axios
            .put(`${ApiUrl}documents/${this.props.match.params.id}`, data)
            .then(response => {
                alert("Jūs sėkmingai pakeitėte dokumento duomenis.");
                this.props.history.push("/Gentoo/user");
            })
            .catch(error => { })
    }



    render() {
        // const item = this.state.doctypes.map(doc =>
        //     <option>{doc.title}</option>
        // )
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
                                <input type="text" className="form-control" name="title" onChange={this.onChange} value={this.state.title} placeholder="Pavadinimas" required />

                            </div>
                            <div className="form-group" >
                                <label > Trumpas aprašymas </label>
                                <textarea className="form-control" name="summary" onChange={this.onChange} value={this.state.summary} rows="3" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Pasirinkite dokumento tipą:
                            <select onChange={this.handleDoctypesChange}>
                                        <option value={this.state.doctypes.id}>{this.state.doctypes.title}</option>
                                        {this.state.doctypeItem}
                                    </select>
                                </label>
                                <button className="btn-dark" id="document" type="submit">Patvirtinti</button>
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

                        <button className="btn btn-dark" type="submit" onClick={this.updateDocument}> Išsaugoti </button>
                    </div>
                </div>
            </div>

        )

    }
}

export default EditDocumentContainer;