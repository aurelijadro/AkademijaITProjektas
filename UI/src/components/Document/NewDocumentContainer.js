import React, { Component } from 'react';
import axios from "axios";
import AddMainDocumentForm from './AddMainDocumentForm';
import ApiUrl from "../../APIURL";
import DoctypeSelect from './DoctypeSelect';

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
            summary: ""
        }
    }

    componentDidMount() {
        axios
            .get(`${ApiUrl}doctypes`)
            .then(response => {
                this.setState({ doctypes: response.data })
            })
            .then()
            .catch(error => {

            });
        axios
            .get(`${ApiUrl}loggedUserId`)
            .then(response => {
                console.log(response)
                this.setState({ userId: response.data });
            })
            .catch(error => {
                alert("Tokio vartotojo nera arba jis neprisijunges.")
            })
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
                this.setState({ showResults: true });
                alert('Prašau prisegti papildomas bylas.')
            })
            .catch(error => {

            });
    }

    show = (e) => {
        return { showResults: false };
    }



    render() {
        const doctypeItem = this.state.doctypes.map((doctype) =>
            <option
                key={doctype.id}
                value={doctype.id}>
                {doctype.title}
            </option>
        )
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
                            </div >

                            <button className="btn-dark" type="submit">Patvirtinti</button>

                        </form>


                        <div>
                            {this.state.showResults ?
                                <div className="row">
                                    <form onSubmit={this.onFormSubmit} >
                                        <div className="form-group" >
                                            <label > Prisekite bylas </label>
                                            <div className="row" > </div>
                                            <input type="file" onChange={this.onFilesChange} />
                                            <div >
                                                <button id="uploadButton" type="submit" > Įkelti </button>
                                            </div >
                                        </div>
                                    </form >
                                </div>
                                : null}
                        </div>




                    </div>
                </div >
            </div >
        );
    }

}

export default NewDocumentContainer;



