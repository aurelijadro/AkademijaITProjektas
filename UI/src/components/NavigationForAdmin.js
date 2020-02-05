import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const NavigationForAdmin = withRouter(({ history, ...props }) => {
  return (
    <nav id="navbar" className="navbar navbar-expand-sm  navbar-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Pagrindinis
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users/add" className="nav-link">
              Naujas vartotojas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/groups/add" className="nav-link">
              Nauja grupė
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/doctypes/add" className="nav-link">
              Naujas dokumentų tipas
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

export default NavigationForAdmin;
