import React from 'react';
import { Link } from 'react-router-dom';

var NavigationForUser = (props) => {
    return (
        <nav id="navbar" className="navbar navbar-expand-sm  navbar-light bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/user" className="nav-link">Pagrindinis</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/documents/add" className="nav-link">Sukurti naują dokumentą</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/documents/non-submited" className="nav-link">Sukurtų dokumentų sąrašas</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/documents/submited" className="nav-link">Pateiktų dokumentų sąrašas</Link>
                    </li>
                </ul>
                <Link to="/">
                    < button type="button" className="btn btn-light">Atsijungti</button>
                </Link>
            </div>
        </nav>
    );
}

export default NavigationForUser;