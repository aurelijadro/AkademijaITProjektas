import React from "react";
import ProductCardComponent from "./ProductCard";
import { AppDataContext } from "../context";

export default function ProductListComponent() {
  const appData = React.useContext(AppDataContext);
  const dovanos = appData.dovanos;

  return (
    <div className="row">
      {dovanos === "loading" ? (
        "Dovanos kraunasi, palaukite..."
      ) : (
        <div>
          <p>We sell amazing products, even {dovanos.length} of them!</p>
          <div className="card-deck">
            {dovanos.map(dovana => {
              return (
                <div className="col-3 mx-auto my-3" key={dovana.id}>
                  <ProductCardComponent dovana={dovana} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
