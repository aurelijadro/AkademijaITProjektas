import React, { Component } from 'react';
import NavigationForUser from './NavigationForUser';
import MainDocumentListForDashboard from './Document/MainDocumentListForDashboard';

class UserDashboard extends Component {
    render() {
        return (
            <div>
                <NavigationForUser />
                <div className="container">
                    <MainDocumentListForDashboard />
                </div>
                <div className="row"></div>
                <hr />
            </div>
        )
    }
}

export default UserDashboard;