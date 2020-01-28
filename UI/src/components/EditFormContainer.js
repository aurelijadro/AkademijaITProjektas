import React, { Component } from "react";
import axios from "axios";
import EditFormPresentation from "./EditFormPresentation";

class EditFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            surname: "",
            username: "",
            password: "",
        };
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct = () => {
        axios
            .get(
                "http://localhost:8080/api/users/" + this.props.match.params.username
            )
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.log(error));
    };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = event => {
        event.preventDefault();
        axios
            .put(
                "http://localhost:8080/api/users/" + this.props.match.params.username,
                {
                    name: this.state.name,
                    surname: this.state.surname,
                    username: this.state.username,
                    password: this.state.password,
                }
            )
            .then(() => {
                this.props.history.push("/admin/users");
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    onBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/users`);
    }

    render() {
        return (
            <div>
                <EditFormPresentation
                    onBack={this.onBack}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    name={this.state.name}
                    surname={this.state.surname}
                    username={this.state.username}
                    password={this.state.password}
                />
            </div>
        );
    }
}

export default EditFormContainer;