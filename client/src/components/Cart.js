import React from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import { cartSubtotal, cartCount } from "../utils";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
};

export default function Cart({
  cart,
  customer,
  clientSecret,
  setClientSecret,
}) {
  const history = useHistory();

  const handleProceedCheckout = async () => {
    const { client_secret } = await api.createPaymentIntent({
      items: cart,
      currency: "cad",
      payment_method_types: ["card"],
      customerId: customer ? customer.id : null,
    });
    setClientSecret(client_secret);
    history.push("/checkout");
  };

  const renderEmpty = () => <div>Cart is empty!</div>;

  const renderCartItems = () => (
    <>
      <div className="flex flex-column tc bt b--black-10">
        <div
          className="b w-80-ns flex justify-around self-end items-center f4 lh-copy"
          style={gridStyle}
        >
          <div>Description</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
        </div>
        {cart.map((item) => (
          <article key={item.id} className="bb b--black-10">
            <div className=" db pv3 ph3 ph0-l black flex flex-column flex-row-ns">
              <div className="pr3-ns mb4 mb0-ns w-100 w-20-ns">
                <img src={item.imgSrc} className="db" alt={item.id} />
              </div>
              <div className="w-100 w-80-ns f4 lh-copy" style={gridStyle}>
                <div>{item.name}</div>
                <div>{item.count}</div>
                <div>{item.amount / 100}</div>
                <div className="b">${(item.amount * item.count) / 100}</div>
              </div>
            </div>
          </article>
        ))}
        <div
          className="b w-80-ns pv2 flex justify-around self-end items-center f4 lh-copy"
          style={gridStyle}
        >
          <div></div>
          <div>{cartCount(cart)}</div>
          <div></div>
          <div>${cartSubtotal(cart) / 100}</div>
        </div>
      </div>

      <button
        disabled={clientSecret}
        className="pointer f6 dim link br1 ph3 pv2 mr5 mt3 mb2 dib white bg-mid-gray fr"
        onClick={handleProceedCheckout}
      >
        Checkout
      </button>
    </>
  );

  return (
    <section className="ma3 pa3">
      <h3 className="mt0">Cart</h3>
      {cart.length < 1 ? renderEmpty() : renderCartItems()}
    </section>
  );
}
