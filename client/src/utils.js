export const cartSubtotal = (cart) =>
  cart
    .map((item) => item.amount * item.count)
    .reduce((acc, cur) => (acc += cur), 0);

export const cartCount = (cart) =>
  cart.map((item) => item.count).reduce((acc, cur) => (acc += cur), 0);
