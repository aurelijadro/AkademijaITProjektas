import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavigationForAdmin from './NavigationForAdmin';


class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <NavigationForAdmin />
                        </div>
                    </div>
                </div>
                <div className="card-deck">
                    <div className="card">
                        <img src="" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Vartotojai</h5>
                            <p className="card-text">Naujo vartotojo kūrimas, informacijos atnaujinimas.</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/admin/users`}><button type="button" className="btn btn-secondary btn-lg btn-block">Išsami informacija</button></Link>
                        </div>
                    </div>
                    <div className="card">
                        <img src="" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Grupės</h5>
                            <p className="card-text">Naujų grupių kūrimas, informacijos atnaujinimas.</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/admin/groups`}><button type="button" className="btn btn-secondary btn-lg btn-block">Išsami informacija</button></Link>
                        </div>
                    </div>
                    <div className="card">
                        <img src="" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Dokumentų tipai</h5>
                            <p className="card-text">Naujų dokumentų tipų kūrimas, informacijos atnaujinimas.</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/admin/doctypes`}><button type="button" className="btn btn-secondary btn-lg btn-block">Išsami informacija</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDashboard;

