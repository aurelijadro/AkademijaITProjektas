import React, { Component } from "react";
import axios from "axios";
import MainDocumentComponent from './MainDocumentComponent';

class MainDocumentListForDashboard extends Component {
    constructor() {
        super();
        this.state = { documents: [] };
        axios
            .get("http://localhost:8081/api/documents")
            .then(response => {
                this.setState({ documents: response.data });
            })
            .catch(error => {
            });
    }

    render() {
        var document = this.state.documents.map((document, index) => {
            return (
                <MainDocumentComponent
                    key={index}
                    id={document.id}
                    title={document.title}
                    summary={document.summary}
                />
            );
        });
        return (
            <div>
                <table className=" text-center table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Dokumento pavadinimas</th>
                            <th scope="col">Trumpas aprašymas</th>
                        </tr>
                    </thead>
                    <tbody>{document}</tbody>
                </table>
            </div>
        );
    }
}

export default MainDocumentListForDashboard;