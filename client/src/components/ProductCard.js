import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 center">
      <img
        src={product.imgSrc}
        className="db w-100 br2 br--top"
        alt={product.name}
      />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{product.name}</h1>
          </div>
          <div className="dtc tr">
            <h2 className="f5 mv0">${product.amount / 100}</h2>
          </div>
        </div>
        <button
          className="pointer f6 dim link br1 ph3 pv2 fr mt3 mb2 dib white bg-mid-gray"
          onClick={(e) => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
