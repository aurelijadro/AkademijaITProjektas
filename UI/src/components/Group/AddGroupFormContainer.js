import React, { Component } from 'react';
import axios from 'axios';
import AddGroupFormComponent from './AddGroupFormComponent';

class AddGroupFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            doctypes: [{
                title: '',
            }]
        };
        console.log(this.state.doctypes);
    }

    componentDidMount() {
        this.getDoctypesByGroup();
    }

    getDoctypesByGroup = () => {
        axios
            .get("http://localhost:8081/api/groups/groupDoctype/" + this.props.match.params.title)
            .then(response => {
                this.setState({ doctypes: response.data });
            })
            .catch(error => {
                alert("Nėra galimybės pateikti duomenų apie dokumentų tipus.");
            });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        let data = {
            title: this.state.title,
        }
        axios
            .post("http://localhost:8081/api/groups", data)
            .then((response) => {
                alert("Jūs sėkmingai sukūrėte grupę: " + this.state.title);
                this.props.history.push("/admin/groups")
            })
            .catch((error) => {
                alert("Grupės sukurti nepavyko.")
            })
        event.preventDefault();
    }

    onBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/groups`);
    }

    render() {
        return (
            <AddGroupFormComponent
                title={this.state.title}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onBack={this.onBack} />
        )
    }
}

export default AddGroupFormContainer;