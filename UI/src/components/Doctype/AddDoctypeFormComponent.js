import React from "react";
import { Link } from "react-router-dom";
import NavigationForAdmin from "../NavigationForAdmin";

const AddDoctypeFormComponent = props => {
  return (
    <div>
      <NavigationForAdmin />

      <div className="container my-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Dokumento tipo kūrimas</h3>
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
              <Link to="/admin/doctypes">
                <button className="btn btn-dark mx-3" onClick={props.onBack}>
                  Grįžti į dokumentų tipų sąrašą
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctypeFormComponent;
