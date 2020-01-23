import React from "react";
import { Link } from "react-router-dom";

export const Nav = function(props) {
  return (
    <nav className=" mb-2 blue">
      <ul className="nav row mx-auto justify-content-center ">
        <li className="nav-item col-2">
          <Link className="nav-link" to="/">
            Dovanos
          </Link>
        </li>
        <li className="nav-item col-2">
          <Link className="nav-link" to="/letters">
            Laiškai
          </Link>
        </li>
        <li className="nav-item col-2">
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
        </li>
        <li className="col-4"></li>
        <li className="nav-item col-2"></li>
      </ul>
    </nav>
  );
};
