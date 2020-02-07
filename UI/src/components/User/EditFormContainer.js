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
            errors: {
                name: "",
                surname: "",
                username: "",
                password: "",
            }
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

    onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.name =
                    value.length <= 2
                        ? 'Vardas turi būti ne trumpesnis nei 2 simbolių.'
                        : '';
                break;
            case 'surname':
                errors.surname =
                    value.length <= 2
                        ? 'Bla bla bla'
                        : '';
                break;
            case 'username':
                errors.username =
                    value.length <= 2
                        ? 'Username must be 2 characters long!'
                        : '';
                break;
            case 'password':
                errors.password =
                    value.length <= 8 && value.length >= 32
                        ? 'Password from 8 to 32'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })

        // const state = this.state
        // state[e.target.name] = e.target.value;
        // this.setState(state, () => { this.validateField(state) });
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
            </div >
        );
    }
}

export default EditFormContainer;