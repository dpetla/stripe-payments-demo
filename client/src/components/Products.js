import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import { cartCount, cartSubtotal } from "../utils";
import ProductCard from "./ProductCard";

export default function Products({ cart, addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .retrieveProducts()
      .then((products) => setProducts(products))
      .catch((error) => console.log("Error (products): ", error));
  }, []);

  return (
    <>
      {cart.length > 0 ? (
        <div className="flex justify-center items-center bg-black-10">
          <p>
            Cart subtotal (
            {cartCount(cart) + (cart.length > 1 ? " items" : " item")}): $
            {cartSubtotal(cart) / 100}
          </p>
          <Link
            to="/cart"
            className="pointer f6 dim link br1 ph3 pv2 fr mv3 ml3 dib white bg-mid-gray"
          >
            Proceed to checkout
          </Link>
        </div>
      ) : null}
      <section className="ma3 pa3">
        <h3 className="mv0">Available Products</h3>
        <div className="flex flex-wrap">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={(product) => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
