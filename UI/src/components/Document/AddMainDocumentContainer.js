import React, {
    Component
} from "react";
import axios from "axios";
import AddMainDocumentForm from './AddMainDocumentForm';

class AddGroupFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            summary: "",
            doctypes: {
                title: ""
            },
            file: null
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ file: e.target.files[0] });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", this.state.file)
        axios
            .post("http://localhost:8080/file/uploadFile", data)
            .then((response) => {
                axios.get("http://localhost:8080/file/allFilesNames")
                    .then(response => {
                        this.setState({ results: response.data });
                    })
                    .catch(error => {
                        alert("Kuriant dokumentą būtina pridėti bent vieną bylą.")
                    });
            })
            .catch((error) => {
                alert("You haven't uploaded any files, please try again.")
            })
    }

    onSubmit = event => {
        event.preventDefault();
        const data = {
            title: this.state.title,
            summary: this.state.summary,
        };
        axios
            .post(`${ApiUrl}groups`, data)
            .then(response => {
                alert("Jūs sėkmingai sukūrėte grupę: " + this.state.title);
                this.props.history.push("/Gentoo/admin/groups");
            })
            .catch(error => {
                alert("Grupės sukurti nepavyko.");
            });
        event.preventDefault();
    };

    onBack = event => {
        event.preventDefault();
        this.props.history.push(`/Gentoo/admin/groups`);
    };

    render() {
        return (<
            AddGroupFormComponent title={
                this.state.title
            }
            onChange={
                this.onChange
            }
            onSubmit={
                this.onSubmit
            }
            onBack={
                this.onBack
            }
        />
        );
    }
}

export default AddGroupFormContainer;