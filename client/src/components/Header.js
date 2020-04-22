import React from "react";
import { Link } from "react-router-dom";

export default function Header({ customer }) {
  return (
    <header className="flex justify-between items-center bg-mid-gray white ph4">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="white">My Stripe Store</h1>
      </Link>
      <div className="flex items-center">
        {customer ? (
          <>
            <img
              src="https://secure.gravatar.com/avatar/5f3aa36f29a3e5cc121e55d432f09f03?s=256&d=mm&r=pg"
              className="br-100 h2 w2 dib mr2"
              alt="avatar"
            />
            <p className="f6">{customer.name}</p>
          </>
        ) : (
          <Link
            to="/signin"
            style={{ textDecoration: "none" }}
            className="pointer f6 dim link br1 ph3 pv2 mt3 mb2 ml3 dib white bg-mid-gray fr"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
