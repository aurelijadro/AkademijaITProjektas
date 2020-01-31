import React from "react";
import { Link } from "react-router-dom";
import { AppDataContext } from "../context";
import Axios from "axios";

export default function AdminPanel() {
  const appData = React.useContext(AppDataContext);
  const dovanos = appData.dovanos;
  const url = "http://localhost:8080";
  //const url = "http://localhost:8081/dovanos";

  if (dovanos === "loading") return <div>Loading...</div>;

  const dovanaList = dovanos.map((dovana, index) => {
    function deleteItem() {
      Axios.delete(`${url}/api/dovanos/${dovana.id}`).then(
        appData.refreshProducts
      );
    }

    return (
      <div className="row my-1" key={dovana.id}>
        <div className="col-2">{index + 1}</div>
        <div className="col-2">
          <Link to={`/admin/dovanos/${dovana.id}`}>
            <img src={dovana.image} className="img-fluid" alt="" />
          </Link>
        </div>
        <Link className="col-3" to={`/admin/dovanos/${dovana.id}`}>
          {dovana.title}
        </Link>
        <button className="col-2 btn btn-danger" onClick={deleteItem}>
          Ištrinti dovaną
        </button>
        <hr></hr>
      </div>
    );
  });
  return (
    <div className="container">
      <Link className="btn btn-info my-2" to="/admin/dovanos/new">
        Sukurti naują dovaną
      </Link>
      <div className="row">
        <div className="col-2">#</div>
        <div className="col-2">Nuotrauka</div>
        <div className="col-6">Dovana</div>
        <div className="col-2"></div>
      </div>
      <div>{dovanaList}</div>
    </div>
  );
}
