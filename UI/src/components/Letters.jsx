import React from "react";
import { Link } from "react-router-dom";
import { AppDataContext } from "../context";
import Axios from "axios";

export default function AdminPanel() {
  const appData = React.useContext(AppDataContext);
  const letters = appData.letters;
  const url = "http://localhost:8080";
  //const url = "http://localhost:8081/letters";

  if (letters === "loading") return <div>Loading...</div>;

  const letterList = letters.map((letter, index) => {
    function deleteItem() {
      Axios.delete(`${url}/api/letters/${letter.id}`).then(
        appData.refreshProducts
      );
    }

    return (
      <div className="row my-1" key={letter.id}>
        <div className="col-2">{index + 1}</div>
        <div className="col-2">
          <Link to={`/admin/letters/${letter.id}`}>
            <img src={letter.image} className="img-fluid" alt="" />
          </Link>
        </div>
        <Link className="col-3" to={`/admin/letters/${letter.id}`}>
          {letter.title}
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
      <Link className="btn btn-info my-2" to="/admin/letters/new">
        Sukurti naują dovaną
      </Link>
      <div className="row">
        <div className="col-2">#</div>
        <div className="col-2">Nuotrauka</div>
        <div className="col-6">Dovana</div>
        <div className="col-2"></div>
      </div>
      <div>{letterList}</div>
    </div>
  );
}
