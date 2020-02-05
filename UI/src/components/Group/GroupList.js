import React, { Component } from "react";
import axios from "axios";
import GroupComponent from "./GroupComponent";
import { Link } from 'react-router-dom';
import NavigationForAdmin from '../NavigationForAdmin';

class GroupList extends Component {
    constructor() {
        super();
        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
        axios
            .get("http://localhost:8081/api/groups")
            .then(response => {
                this.setState({ groups: response.data });
            })
            .catch(error => {
                alert("Nėra galimybės pateikti duomenų apie grupes.");
            });
    }

    render() {
        let group = this.state.groups.map((group, index) => {
            return (
                <GroupComponent
                    key={index}
                    id={group.id}
                    title={group.title}
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
                <Link to="/admin/groups/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Pridėti naują grupę</button></Link>
                <Link to="/admin"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grįžti į pradinį langą</button></Link>
                <table className=" text-center table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Grupės pavadinimas</th>
                        </tr>
                    </thead>
                    <tbody>{group}</tbody>
                </table>
            </div>
        );
    }
}

export default GroupList;