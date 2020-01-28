import React, { Component } from "react";
import axios from "axios";
import DocTypeComponent from "./DocTypeComponent";
import { Link } from 'react-router-dom';
import NavigationForAdmin from './NavigationForAdmin';

class DocTypeList extends Component {
    constructor() {
        super();
        this.state = { doctypes: [] };
        axios
            .get("http://localhost:8080/api/doctypes")
            .then(response => {
                this.setState({ doctypes: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        var doctype = this.state.doctypes.map((doctype, index) => {
            return (
                <DocTypeComponent
                    key={index}
                    id={doctype.id}
                    title={doctype.title}
                />
            );
        });
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <NavigationForAdmin />
                        </div>
                    </div>
                </div>
                <Link to="/admin/doctypes/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Pridėti naują dokumentų tipą</button></Link>
                <Link to="/admin"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grįžti į pradinį langą</button></Link>
                <table className=" text-center table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Dokumentų tipo pavadinimas</th>
                        </tr>
                    </thead>
                    <tbody>{doctype}</tbody>
                </table>
            </div>
        );
    }
}

export default DocTypeList;