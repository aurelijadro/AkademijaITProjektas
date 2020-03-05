import React, { Component } from 'react';
import axios from "axios";
import ApiUrl from "../../APIURL";

class ReviewDocumentContainer extends Component {
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
            submissionDate: "",
            approvalDate: "",
            rejectionDate: "",
            documentStatus: "",
            rejectionReason: "",
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

    goBack = e => {
        e.preventDefault();
        this.props.history.push(`/Gentoo/user`);
    }

    render() {
        const result = this.state.results.map((result, index) => {
            return <li className="list-group-item list-group-item-dark" id="mylist2" key={index}>
                <div className="row my-1">
                    <div className="col-2">{index + 1}</div>
                    <div className="col-10">{result}</div>
                </div>
            </li>
        });
        return (
            <div className="container my-4" >
                <div className="panel panel-default" >
                    <div className="panel-heading" >
                        <h3 className="panel-title" > Dokumento peržiūra </h3>
                    </div>
                    <div className="panel-body" >
                        <form >
                            <div className="form-group" >
                                <label > Pavadinimas </label>
                                <textarea className="form-control" name="title" readOnly value={this.state.title} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Pateikimo data </label>
                                <textarea className="form-control" name="subbmision" readOnly value={this.state.submissionDate} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Priėmimo data </label>
                                <textarea className="form-control" name="accept" readOnly value={this.state.approvalDate} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Atmetimo data </label>
                                <textarea className="form-control" name="rejection" readOnly value={this.state.rejectionDate} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Statusas </label>
                                <textarea className="form-control" name="status" readOnly value={this.state.documentStatus} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Atmetimo priežastis </label>
                                <textarea className="form-control" name="rejectionReason" readOnly value={this.state.rejectionReason} rows="1" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Trumpas aprašymas </label>
                                <textarea className="form-control" name="summary" readOnly value={this.state.summary} rows="3" > </textarea>
                            </div >
                            <div className="form-group" >
                                <label > Dokumento tipas </label>
                                <textarea className="form-control" name="doctype" readOnly value={this.state.doctypes.title} rows="1" > </textarea>
                            </div >
                        </form>
                        <form onSubmit={this.onFormSubmit} >
                            <div className="form-group" >
                                <label > Jūsų prisegtos bylos: </label>
                                <li className="list-group-item list-group-item-dark" id="mylist">
                                    <div className="row my-2">
                                        <div className="col-2 font-weight-bold">#</div>
                                        <div className="col-10 font-weight-bold">Bylos pavadinimas</div>
                                    </div>
                                </li>
                                <div>{result}</div>
                                <div className="row" > </div>

                            </div>
                        </form >
                        <div className="panel-body">
                            <label>Parsisiųsti bylas peržiūrai:</label>
                            <div className="row" > </div>
                            <button className="download" onClick={this.downloadFiles}>Atsisiųsti</button>
                        </div>
                        <button className="btn btn-dark" id="saveButton" type="submit" onClick={this.goBack}> Grįžti į dokumentų sąrašą </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ReviewDocumentContainer;