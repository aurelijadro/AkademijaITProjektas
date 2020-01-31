import React, { Component } from "react";
import axios from "axios";
import EditDoctypeFormComponent from "./EditDoctypeFormComponent"

class EditDoctypeFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }

    componentDidMount() {
        this.getDoctype();
    }

    getDoctype = () => {
        axios
            .get(
                "http://localhost:8080/api/doctypes/" + this.props.match.params.title
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
        console.log({
            title: this.state.title
        })
        axios
            .put(
                "http://localhost:8080/api/doctypes/" + this.props.match.params.title,
                {
                    title: this.state.title

                }
            )
            .then(() => {
                this.props.history.push("/admin/doctypes");
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    onBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/doctypes`);
    }

    render() {
        return (
            <div>
                <EditDoctypeFormComponent
                    title={this.state.title}
                    onBack={this.onBack}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default EditDoctypeFormContainer;