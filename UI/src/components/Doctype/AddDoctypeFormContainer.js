import React, { Component } from 'react';
import axios from 'axios';
import AddDoctypeFormComponent from './AddDoctypeFormComponent';

class AddDoctypeFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            doctype: {
                title: '',
            }
        };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        let data = {
            title: this.state.title,
        }
        axios
            .post("http://localhost:8080/api/doctypes", data)
            .then((response) => {
                this.props.history.push("/admin/doctypes")
            })
            .catch((error) => {
                console.log(error);
            })
        event.preventDefault();
    }

    onBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/doctypes`);
    }

    render() {
        return (
            <AddDoctypeFormComponent
                title={this.state.title}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onBack={this.onBack} />
        )
    }
}

export default AddDoctypeFormContainer;