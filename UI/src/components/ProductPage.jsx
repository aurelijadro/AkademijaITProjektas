import React from "react";
import { AppDataContext } from "../context";
import { Link, Redirect } from "react-router-dom";

export default function ProductPage(props) {
  const appData = React.useContext(AppDataContext);
  const dovanos = appData.dovanos;

  if (dovanos === "loading") return "Loading";

  const dovana = dovanos.find(
    dovana => String(dovana.id) === props.match.params.id
  );
  if (!dovana) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container row">
      <div className="col-4">
        <img src={dovana.image} className="img-fluid" alt={dovana.title}></img>
      </div>
      <div className="col-8">
        <h1>{dovana.title}</h1>
        <h4>{dovana.description}</h4>
        <h4>Price: {dovana.price}</h4>
        <Link className="btn btn-light" to="/">
          Back
        </Link>
        <button
          className="btn btn-info mx-2"
          onClick={() => appData.addCartItem(dovana.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
