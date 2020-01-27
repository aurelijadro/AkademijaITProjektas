import React, { Component } from "react";
import axios from "axios";
import UserComponent from "./UserComponent";
import { Link } from 'react-router-dom';

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
                <Link to="/admin/users/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Prideti nauja vartotoja</button></Link>
                <Link to="/admin"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grizti i pradini langa</button></Link>
                <table className=" text-center table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Prisijungimo vardas</th>
                            <th scope="col">Vardas</th>
                            <th scope="col">Pavarde</th>
                        </tr>
                    </thead>
                    <tbody>{user}</tbody>
                </table>
            </div>
        );
    }
}

export default UserList;