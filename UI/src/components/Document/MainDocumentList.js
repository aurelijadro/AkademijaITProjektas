import React, { Component } from "react";
import axios from "axios";
import MainDocumentComponent from './MainDocumentComponent';
import { Link } from 'react-router-dom';
import NavigationForUser from "../NavigationForUser";
import MainDocumentListForDashboard from "./MainDocumentListForDashboard";

class MainDocumentList extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <NavigationForUser />
                        </div>
                    </div>
                </div>
                <Link to="/user/documents/add"><button type="button" className="btn btn-light" onClick={this.props.onAddNew}>Pridėti naują dokumentą</button></Link>
                <Link to="/user"><button type="button" className="btn btn-light" onClick={this.props.onBack}>Grįžti į pradinį langą</button></Link>
                <MainDocumentListForDashboard />
            </div>
        );
    }
}

export default MainDocumentList;