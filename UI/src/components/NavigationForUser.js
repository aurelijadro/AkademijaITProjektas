import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiForLogin from "../ApiForLogin";

const NavigationForUser = withRouter(({ history, ...props }) => {
  return (
    <nav id="navbar" className="navbar navbar-expand-sm  navbar-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/Gentoo/user" className="nav-link">
              Mano dokumentai
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Gentoo/user/documents/add" className="nav-link">
              Sukurti naują dokumentą
            </Link>
          </li>
          {props.isModerator ? (
            <>
              <li className="nav-item">
                <Link to="/Gentoo/user/moderate" className="nav-link">
                  Moderuoti dokumentus
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Gentoo/user/archyved" className="nav-link">
                  Dokumentų archyvas
                </Link>
              </li>
            </>
          ) : null}
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

export default NavigationForUser;
