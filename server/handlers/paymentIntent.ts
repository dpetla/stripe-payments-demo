import * as express from "express";
import stripe from "../stripe";
import { products } from "../demo-data";

const currencies = ["cad", "usd"];

const getItemsAmount = (items) =>
  items
    .map(({ id, count }) => products[id].amount * count)
    .reduce((acc, cur) => (acc += cur), 0);

const paymentIntentRouter = express.Router();

paymentIntentRouter.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    const { items, currency, customerId } = req.body;
    if (!currencies.includes(currency)) {
      res.status(400).send("Invalid currency.");
    }
    const options = Object.assign(
      {
        amount: getItemsAmount(items),
        currency,
      },
      customerId ? { customer: customerId } : {}
    );

    const paymentIntent = await stripe.paymentIntents.create(options);
    res.send(paymentIntent);
  }
);
export default paymentIntentRouter;
