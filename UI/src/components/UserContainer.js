import React, { Component } from 'react';
import UserList from './UserList';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/users")
            .then((response) => {
                console.log(response)
                this.setState({ users: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // handleCheckDetails = (event, id) => {
    //     console.log(productId)
    //     event.preventDefault();
    //     this.props.history.push(`/admin/` + productId);
    // }

    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container">

                <Link to="/admin/users/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Prideti nauja vartotoja</button></Link>
                <Link to="/admin"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grizti i pradini langa</button></Link>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Prisijungimo vardas</th>
                            <th scope="col">Vardas</th>
                            <th scope="col">Pavarde</th>
                        </tr>
                    </thead>
                </table>
                <UserList
                    users={this.state.users}
                // onCheckDetails={this.handleCheckDetails}
                />
            </div>
        );
    }
};

export default UserContainer;