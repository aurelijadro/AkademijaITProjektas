import React, { Component } from 'react';
import axios from "axios";
import AddMainDocumentForm from './AddMainDocumentForm';
import ApiUrl from "../../APIURL";
import DoctypeSelect from './DoctypeSelect';

class NewDocumentContainer extends Component {
    constructor() {
        super();
        this.state = {
            doctypes: []
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

            })
    }

    handleDoctypesChange = e => {
        this.setState({ doctypeItem: e.target.value });
        console.log(e.target.value)
    };

    addNewDocument = e => {
        axios
            .post()
    }



    render() {
        const doctypeItem = this.state.doctypes.map((doctype) =>
            <option key={doctype.id} value={doctype.title}>
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
                        <form onSubmit={this.onSubmit} >
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



                    </div>
                </div >
            </div >
        );
    }

}

export default NewDocumentContainer;



