import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const NavigationForUser = withRouter(({ history, ...props }) => {
  return (
    <nav id="navbar" className="navbar navbar-expand-sm  navbar-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              Pagrindinis
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/documents/add" className="nav-link">
              Sukurti naują dokumentą
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/documents/non-submited" className="nav-link">
              Sukurtų dokumentų sąrašas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/documents/submited" className="nav-link">
              Pateiktų dokumentų sąrašas
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            axios.post("http://localhost:8081/logout").then(resp => {
              history.push("/");
            });
          }}
        >
          Atsijungti
        </button>
      </div>
    </nav>
  );
});

export default NavigationForUser;
