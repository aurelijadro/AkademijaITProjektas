import React from "react";
import { Link } from "react-router-dom";

class ProductCardComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="card mx-2" style={{ width: "13rem" }}>
        <img
          src={this.props.dovana.image}
          className="card-img-top img-fluid"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.dovana.title}</h5>
          <p className="card-text m-0 p-0">{this.props.dovana.description}</p>
          <Link
            className="btn btn-primary"
            to={`/dovanos/${this.props.dovana.id}`}
          >
            Daugiau informacijos
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCardComponent;
