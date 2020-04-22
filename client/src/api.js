const baseUrl = "http://localhost:4242/dev";

export const getPublicKey = async () => {
  const res = await fetch(`${baseUrl}/public-key`);
  return await res.json();
};

export const createPaymentIntent = async (options) => {
  const res = await fetch(`${baseUrl}/paymentIntent/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  return await res.json();
};

export const retrieveCustomer = async (id) => {
  const res = await fetch(`${baseUrl}/customers/${id}`);
  return await res.json();
};

export const retrieveCustomers = async (id) => {
  const res = await fetch(`${baseUrl}/customers`);
  return await res.json();
};

export const listPaymentMethods = async (customerId) => {
  const res = await fetch(`${baseUrl}/paymentMethods/list/${customerId}`);
  return await res.json();
};

export const retrieveProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  return await res.json();
};
