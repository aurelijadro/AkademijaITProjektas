import React from 'react';
import { Link } from 'react-router-dom';

var NavigationForAdmin = (props) => {
    return (
        <nav className="navbar navbar-expand-sm  navbar-light bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">Pagrindinis</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/users/add" className="nav-link">Naujas vartotojas</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/groups/add" className="nav-link">Nauja grupė</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/doctypes/add" className="nav-link">Naujas dokumentų tipas</Link>
                    </li>
                </ul>
                <Link to="/">
                    < button type="button" className="btn btn-light">Atsijungti</button>
                </Link>
            </div>
        </nav>
    );
}

export default NavigationForAdmin;