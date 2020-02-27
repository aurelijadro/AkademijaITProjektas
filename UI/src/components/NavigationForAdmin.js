import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiForLogin from "../ApiForLogin";
const NavigationForAdmin = withRouter(({ history, ...props }) => {
  return (
    <nav id="navbar" className="navbar navbar-expand-sm  navbar-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/Gentoo/admin" className="nav-link">
              Pagrindinis
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Gentoo/admin/users" className="nav-link">
              Vartotojai
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Gentoo/admin/groups" className="nav-link">
              Grupės
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Gentoo/admin/doctypes" className="nav-link">
              Dokumentų tipai
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            axios.post(`${ApiForLogin}logout`).then(resp => {
              history.push("/Gentoo/");
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
