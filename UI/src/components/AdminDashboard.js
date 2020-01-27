import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AdminDashboard extends Component {
    render() {
        return (
            <div className="card-deck">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Vartotojai</h5>
                        <p className="card-text">Naujo vartotojo kurimas, informacijos atnaujinimas.</p>
                    </div>
                    <div className="card-footer">
                        <Link to={`/admin/users`}><button type="button" className="btn btn-secondary btn-lg btn-block">Issami informacija</button></Link>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Grupes</h5>
                        <p className="card-text">Nauju grupiu kurimas, informacijos atnaujinimas.</p>
                    </div>
                    <div className="card-footer">
                        <Link to={`/admin/groups`}><button type="button" className="btn btn-secondary btn-lg btn-block">Issami informacija</button></Link>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Dokumentu tipai</h5>
                        <p className="card-text">Nauju dokumentu tipu kurimas, informacijos atnaujinimas.</p>
                    </div>
                    <div className="card-footer">
                        <Link to={`/admin/doctypes`}><button type="button" className="btn btn-secondary btn-lg btn-block">Issami informacija</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDashboard;

