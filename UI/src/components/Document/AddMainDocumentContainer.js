import React, {
    Component
} from "react";
import axios from "axios";
import AddMainDocumentForm from './AddMainDocumentForm';
import ApiUrl from "../../APIURL";
import FileListComponent from './FileListComponent';

class AddMainDocumentContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            summary: "",
            doctypes: [{
                id: "",
                title: "",
            }],
            file: null,
            results: [],
            userId: ""
        };
        console.log(this.state.userId)
        console.log(this.state.doctypes)
    }

    getUserId = () => {
        axios
            .get(`${ApiUrl}loggedUserId`)
            .then(response => {
                console.log(response)
                this.setState({ userId: response.data });
            })
            .catch(error => {
                alert("Tokio vartotojo nera arba jis neprisijunges.")
            })
    };

    componentDidMount() {
        this.getDoctypes();
    }

    getDoctypes = () => {
        axios
            .get("http://localhost:8081/Gentoo/api/doctypes")
            .then(response => {
                console.log(response)
                this.setState({ doctypes: response.data });
            })
            .catch(error => {

            })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    };

    onFilesChange = event => {
        this.setState({ file: event.target.files[0] });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", this.state.file)
        axios
            .post(`${ApiUrl}files/1/uploadFile`, data)
            .then((response) => {
                axios.get(`${ApiUrl}files/1/uploadedFilesNames`)
                    .then(response => {
                        this.setState({ results: response.data });
                        console.log(this.state.results)
                    })
                    .catch(error => {
                        alert("Kuriant dokumentą būtina pridėti bent vieną bylą.")
                    });
            })
            .catch((error) => {
                alert("You haven't uploaded any files, please try again.")
            })
    }

    // onSubmit = event => {
    //     event.preventDefault();
    //     const data = {
    //         title: this.state.title,
    //         summary: this.state.summary,
    //     };
    //     axios
    //         .post(`${ApiUrl}groups`, data)
    //         .then(response => {
    //             alert("Jūs sėkmingai sukūrėte grupę: " + this.state.title);
    //             this.props.history.push("/Gentoo/admin/groups");
    //         })
    //         .catch(error => {
    //             alert("Grupės sukurti nepavyko.");
    //         });
    //     event.preventDefault();
    // };


    render() {
        let result = this.state.results.map((result, index) => {
            return <FileListComponent key={index} result={result} />;
        });
        // let doctype = this.state.doctypes.map((doctype) => {
        //     return (<option key={doctype.title} value={doctype.title}>{doctype.title}</option>);
        // })
        return (
            <div className="container">
                <AddMainDocumentForm
                    title={this.state.title}
                    onChange={this.onChange}
                    onFormSubmit={this.onFormSubmit}

                />

                <div className="form-group" >
                    <label > Pasirinkite dokumento tipą:
                <select
                            onChange={this.getDoctypes}>
                            {this.state.doctypes.map((doctype) => {
                                return (<option key={doctype.id} value={doctype.title}>{doctype.title}</option>);
                            })}
                        </select>
                    </label>
                </div >

                <FileListComponent
                    onFilesChange={this.onFilesChange}
                    onFormSubmit={this.onFormSubmit}
                />

                <h3 id="upload"> You have uploaded these files: </h3>
                {result}

                <button className="btn btn-dark" type="submit" > Išsaugoti </button>

            </div>

        );
    }
}

export default AddMainDocumentContainer;