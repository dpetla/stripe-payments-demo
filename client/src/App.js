import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as api from "./api";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import Header from "./components/Header";
import Products from "./components/Products";
import SignIn from "./components/SignIn";

let stripePromise;
api.getPublicKey().then(({ publicKey }) => {
  stripePromise = loadStripe(publicKey);
});

export default function App() {
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [customer, setCustomer] = useState(null);

  const addToCart = (product) => {
    let newCart;
    const included = cart.find((item) => item.id === product.id);
    if (included) {
      newCart = cart.map((p) =>
        p.id === product.id ? { ...p, count: ++p.count } : p
      );
    } else {
      newCart = [...cart, { ...product }];
    }
    setCart(newCart);
  };

  return (
    <div className="helvetica">
      <BrowserRouter forceRefresh={false}>
        <Header customer={customer} />
        <Switch>
          <Route
            exact
            path="/signin"
            component={() => <SignIn setCustomer={setCustomer} />}
          />
          <Route
            exact
            path="/"
            component={() => <Products cart={cart} addToCart={addToCart} />}
          />
          <Route
            exact
            path="/cart"
            render={() => (
              <Cart
                cart={cart}
                customer={customer}
                clientSecret={clientSecret}
                setClientSecret={setClientSecret}
              />
            )}
          />
          <Route
            exact
            path="/checkout"
            render={() => (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  customer={customer}
                  setCart={setCart}
                  clientSecret={clientSecret}
                  setClientSecret={setClientSecret}
                />
              </Elements>
            )}
          />
          <Route path="/" render={() => "404 - Page not found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
