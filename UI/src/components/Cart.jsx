import React from "react";
import { useMyData } from "../context";

export default function Cart() {
  const { cartItems, products, discardCartItem } = useMyData();

  const cartContents = cartItems.map((item, index) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) throw new Error("Produktas turejo buti rastas");

    return (
      <div className="row my-2" key={product.id}>
        <div className="col-2">{index + 1}</div>
        <img
          className="col-1 img-fluid img-thumbnail"
          alt=""
          src={product.imageURL}
        ></img>
        <div className="col-2"> {product.name}</div>
        <div className="col-2">{item.quantity}</div>
        <button
          className="btn btn-info col-2"
          onClick={() => discardCartItem(product.id)}
        >
          Remove items
        </button>
      </div>
    );
  });

  return (
    <div>
      <div className="row">
        <div className="col-2">#</div>
        <div className="col-2"></div>
        <div className="col-2">Product</div>
        <div className="col-2">Quantity</div>
      </div>
      {cartContents}
    </div>
  );
}
