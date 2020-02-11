import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavigationForAdmin from "./NavigationForAdmin";
import group from "../img/group.jpg";
import user from "../img/user.jpg";
import doctypes from "../img/doctype.jpg";

const styles = {
  image: { height: "200px" }
};

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <NavigationForAdmin />
        <div className="container my-3">
          <div className="card-deck">
            <div className="card">
              <div className="embed-responsive embed-responsive-16by9">
                <img
                  src={user}
                  className="card-img-top embed-responsive-item"
                  alt="..."
                  style={styles.image}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Vartotojai</h5>
                <p className="card-text">
                  Naujo vartotojo kūrimas, informacijos atnaujinimas.
                </p>
              </div>
              <div className="card-footer">
                <Link to={`/Gentoo/admin/users`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                  >
                    Išsami informacija
                  </button>
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="embed-responsive embed-responsive-16by9">
                <img
                  src={group}
                  className="card-img-top  embed-responsive-item"
                  alt="..."
                  style={styles.image}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Grupės</h5>
                <p className="card-text">
                  Naujų grupių kūrimas, informacijos atnaujinimas.
                </p>
              </div>
              <div className="card-footer">
                <Link to={`/Gentoo/admin/groups`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                  >
                    Išsami informacija
                  </button>
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="embed-responsive embed-responsive-16by9">
                <img
                  src={doctypes}
                  className="card-img-top embed-responsive-item"
                  alt="..."
                  style={styles.image}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Dokumentų tipai</h5>
                <p className="card-text">
                  Naujų dokumentų tipų kūrimas, informacijos atnaujinimas.
                </p>
              </div>
              <div className="card-footer">
                <Link to={`/Gentoo/admin/doctypes`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                  >
                    Išsami informacija
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
