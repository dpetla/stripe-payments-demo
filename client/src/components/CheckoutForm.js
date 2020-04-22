import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import SavedCards from "./SavedCards";

export default function CheckoutForm({
  clientSecret,
  setClientSecret,
  setCart,
  customer,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("new");
  const [saveCard, setSaveCard] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    if (customer) {
      retrievePaymentMethods();
    }
  }, [customer]);

  const retrievePaymentMethods = async () => {
    const { data } = await api.listPaymentMethods(customer.id);
    setPaymentMethods(data);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method:
            selectedOption === "new"
              ? {
                  card: elements.getElement(CardElement),
                }
              : selectedCard,
          setup_future_usage: saveCard ? "on_session" : null,
        }
      );

      error ? onError(error.message) : onSuccess(paymentIntent);
    } catch (error) {
      onError(error);
    }
  };

  const onError = (error) => {
    setError(`Payment failed: ${error}`);
    setProcessing(false);
  };

  const onSuccess = (paymentIntent) => {
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    setPaymentIntent(paymentIntent);
    if (saveCard) {
      retrievePaymentMethods();
    }
    setTimeout(() => {
      setClientSecret(null);
      setSucceeded(null);
      setCart([]);
      history.push("/");
    }, 3000);
  };

  const renderPaymentOptionSelection = () => {
    return (
      <>
        {paymentMethods.length > 0 ? (
          <form>
            <label className="mr3">
              New card
              <input
                type="radio"
                name="type"
                value="new"
                className="ml2"
                checked={selectedOption === "new"}
                onChange={({ target }) => setSelectedOption(target.value)}
              />
            </label>
            <label className="mr3">
              Saved card
              <input
                type="radio"
                name="type"
                value="saved"
                className="ml2"
                checked={selectedOption === "saved"}
                onChange={({ target }) => setSelectedOption(target.value)}
              />
            </label>
          </form>
        ) : null}
        {renderPaymentOption()}
      </>
    );
  };

  const renderForm = () => (
    <form className="mt3">
      <label>
        Card details
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </label>
      {customer ? (
        <label className="db mv2">
          Save card
          <input
            disabled={!customer}
            type="checkbox"
            className="ml2"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
          />
        </label>
      ) : (
        ""
      )}
    </form>
  );

  const renderPaymentOption = () => {
    return selectedOption === "new" ? (
      renderForm()
    ) : (
      <SavedCards
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        paymentMethods={paymentMethods}
      />
    );
  };

  return (
    <section className="ma3 pa3">
      <h3 className="mt0">Checkout</h3>
      {succeeded ? <p>Payment succeeded!!</p> : renderPaymentOptionSelection()}
      {processing ? <p>Processing...</p> : null}
      {error ? <p className="red">{error}</p> : null}
      {processing || succeeded ? null : (
        <button
          className="pointer f6 dim link br1 ph3 pv2 mt3 mb2 dib white bg-mid-gray"
          type="submit"
          disabled={!stripe}
          onClick={handleConfirmPayment}
        >
          Confirm order
        </button>
      )}
    </section>
  );
}
