import React, { Component } from "react";
import axios from "axios";
import EditFormComponent from "./EditFormComponent,";

class EditFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            surname: "",
            username: "",
            password: "",
            role: "",
        };
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios
            .get(
                "http://localhost:8081/api/users/" + this.props.match.params.username
            )
            .then(response => {
                this.setState(response.data);
                this.setState({ password: "" })
            })
            .catch(error => {
                alert("Nėra galimybės pateikti duomenų apie vartotoją.")
            });
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
                "http://localhost:8081/api/users/" + this.props.match.params.username,
                {
                    name: this.state.name,
                    surname: this.state.surname,
                    username: this.state.username,
                    password: this.state.password,
                    role: this.state.role

                }
            )
            .then(() => {
                alert("Jūs sėkmingai pakeitėte vartotojo duomenis.");
                this.props.history.push("/admin/users");
            })
            .catch(function (error) {
                alert("Toks vartotojo vardas jau egzistuoja.")
            });
    };


    onBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/users`);
    }

    render() {
        return (
            <div>
                <EditFormComponent
                    role={this.state.role}
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