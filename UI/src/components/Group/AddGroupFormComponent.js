import React from "react";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";

const AddGroupFormComponent = props => {
  return (
    <div>
      <NavigationForAdmin />
      <div className="container">
        <div className="panel panel-default my-4">
          <div className="panel-heading">
            <h3 className="panel-title">Grupių kūrimas</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={props.onSubmit}>
              <div className="form-group">
                <label>Pavadinimas:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={props.onChange}
                  placeholder="Pavadinimas"
                  required
                />
              </div>

              <button className="btn btn-dark" type="submit">
                Išsaugoti
              </button>
              <Link to="/Gentoo/admin/groups">
                <button className="btn btn-dark  mx-3" onClick={props.onBack}>
                  Grįžti į grupių sąrašą
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupFormComponent;
