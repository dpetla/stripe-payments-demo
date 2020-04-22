import React from "react";

export default function SavedCards({
  selectedCard,
  setSelectedCard,
  paymentMethods,
}) {
  return (
    <form className="mt3">
      {paymentMethods.length > 0 ? (
        paymentMethods.map(({ id, card }) => (
          <label key={id} className="db mv2">
            <input
              type="radio"
              name="card"
              value={id}
              className="mr2"
              checked={selectedCard === id}
              onChange={({ target }) => setSelectedCard(target.value)}
            />
            {card.brand} ending in {card.last4} ({card.exp_month}/
            {card.exp_year})
          </label>
        ))
      ) : (
        <p>No saved Cards.</p>
      )}
    </form>
  );
}
