import React, { Component } from "react";
import axios from "axios";
import UploadFileComponent from "./UploadFileComponent";

class UploadFileContainer extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
        };
    }

    onFileChangeHandler = (e) => {
        // e.preventDefault();
        // this.setState({ selectedFile: e.target.files[0] });
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('file', e.target.files[i]);
        }
        axios.post("http://localhost:8081/api/documents/upload", formData)
            .then(res => {
                console.log(res.data);
                alert("File uploaded succesfully.")
            })

    };

    render() {
        return (
            <div>
                <UploadFileComponent
                    onFileChangeHandler={this.onFileChangeHandler}
                />
            </div>
        );
    }

}

export default UploadFileContainer;