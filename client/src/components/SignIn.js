import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";

export default function SignIn({ setCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (customers) {
      api.retrieveCustomers().then((customers) => setCustomers(customers));
    }
  }, []);

  const handleSignIn = async ({ target }) => {
    const { value } = target;
    if (value) {
      const customer = await api.retrieveCustomer(value);
      setSelectedCustomer(value);
      setCustomer(customer);
      history.push("/");
    }
  };

  return (
    <section className="ma3 pa3">
      <h3 className="mt0">Sign In</h3>
      <form>
        <label>
          Select a customer
          <br />
          <select
            name="customer"
            id="customer-select"
            className="mt2"
            value={selectedCustomer}
            onChange={handleSignIn}
          >
            <option value=""></option>
            {customers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </form>
    </section>
  );
}
