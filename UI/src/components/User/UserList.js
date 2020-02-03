import React, { Component } from "react";
import axios from "axios";
import UserComponent from "./UserComponent";
import { Link } from 'react-router-dom';
import NavigationForAdmin from '../NavigationForAdmin';

class UserList extends Component {
    constructor() {
        super();
        this.state = { users: [] };
        axios
            .get("http://localhost:8080/api/users")
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        var user = this.state.users.map((user, index) => {
            return (
                <UserComponent
                    key={index}
                    id={user.id}
                    username={user.username}
                    name={user.name}
                    surname={user.surname}
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
                <Link to="/admin/users/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Pridėti naują vartotoją</button></Link>
                <Link to="/admin"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grįžti į pradinį langą</button></Link>
                <table className=" text-center table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Prisijungimo vardas</th>
                            <th scope="col">Vardas</th>
                            <th scope="col">Pavardė</th>
                        </tr>
                    </thead>
                    <tbody>{user}</tbody>
                </table>
            </div>
        );
    }
}

export default UserList;